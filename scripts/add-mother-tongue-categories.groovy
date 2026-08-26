/*
 * Adds languages to the "Mother tongue" vocabulary in the Global site, each with
 * the `code` category property the frontend relies on.
 *
 * Run from: Control Panel -> Server Administration -> Script (language: Groovy)
 *
 * Why the `code` property matters: CategoryRestController only returns a
 * category if it has a property named `code` (it becomes the `key` in the JSON
 * the sign-up form submits). A category without it is silently skipped and the
 * language never appears in the dropdown.
 *
 * Safe to re-run: existing languages are detected by their `code` and skipped.
 * Leave DRY_RUN = true for the first pass to see what would change.
 */

import com.liferay.asset.kernel.model.AssetCategory
import com.liferay.asset.kernel.service.AssetCategoryLocalServiceUtil
import com.liferay.asset.kernel.service.AssetVocabularyLocalServiceUtil
import com.liferay.portal.kernel.dao.orm.QueryUtil
import com.liferay.portal.kernel.model.RoleConstants
import com.liferay.portal.kernel.module.util.SystemBundleUtil
import com.liferay.portal.kernel.service.GroupLocalServiceUtil
import com.liferay.portal.kernel.service.RoleLocalServiceUtil
import com.liferay.portal.kernel.service.ServiceContext
import com.liferay.portal.kernel.service.UserLocalServiceUtil
import com.liferay.portal.kernel.util.LocaleUtil
import com.liferay.portal.kernel.util.PortalUtil

// ─────────────────────────────────────────────────────────────
//  Configuration
// ─────────────────────────────────────────────────────────────

def DRY_RUN = false                      // true = report only, false = write
def VOCABULARY_NAME = "Mother tongue"
def PROPERTY_KEY = "code"

//  code  = value stored in the profile (must match what the backend expects)
//  en/ar = category title shown in each locale
def LANGUAGES = [
    [code: "fr", en: "French",     ar: "الفرنسية"],
    [code: "de", en: "German",     ar: "الألمانية"],
    [code: "ur", en: "Urdu",       ar: "الأردية"],
    [code: "hi", en: "Hindi",      ar: "الهندية"],
    [code: "tr", en: "Turkish",    ar: "التركية"],
    [code: "id", en: "Indonesian", ar: "الإندونيسية"],
    [code: "zh", en: "Chinese",    ar: "الصينية"],
    [code: "ru", en: "Russian",    ar: "الروسية"],
]

// ─────────────────────────────────────────────────────────────

def out = new StringBuilder()
def companyId = PortalUtil.getDefaultCompanyId()

def globalGroup = GroupLocalServiceUtil.fetchFriendlyURLGroup(companyId, "/global")

if (globalGroup == null) {
    out << "ABORT: Global site not found\n"
    println out
    return
}

def vocabulary = AssetVocabularyLocalServiceUtil.fetchGroupVocabulary(
        globalGroup.getGroupId(), VOCABULARY_NAME)

if (vocabulary == null) {
    out << "ABORT: vocabulary '${VOCABULARY_NAME}' not found in the Global site\n"
    println out
    return
}

// Categories are created as this user (an administrator, so permissions are set).
def adminUsers = UserLocalServiceUtil.getRoleUsers(
        RoleLocalServiceUtil.getRole(companyId, RoleConstants.ADMINISTRATOR).getRoleId())

if (adminUsers.isEmpty()) {
    out << "ABORT: no administrator user found\n"
    println out
    return
}

def userId = adminUsers.get(0).getUserId()

out << "Vocabulary : ${VOCABULARY_NAME} (id ${vocabulary.getVocabularyId()})\n"
out << "Global site: ${globalGroup.getGroupId()}\n"
out << "Created by : ${adminUsers.get(0).getEmailAddress()} (userId ${userId})\n"
out << "Mode       : ${DRY_RUN ? 'DRY RUN — nothing will be written' : 'LIVE'}\n\n"

// The property service lives in a module, so reach it through the OSGi
// registry by class name rather than importing it.
def propertyServiceName =
        "com.liferay.asset.category.property.service.AssetCategoryPropertyLocalService"

def readCode = { long categoryId ->
    SystemBundleUtil.callService(propertyServiceName, { service ->
        def property = service.fetchCategoryProperty(categoryId, PROPERTY_KEY)
        return (property == null) ? null : property.getValue()
    })
}

// ── Existing top-level categories, indexed by their code ──
def existing = [:]

AssetCategoryLocalServiceUtil.getVocabularyRootCategories(
        vocabulary.getVocabularyId(), QueryUtil.ALL_POS, QueryUtil.ALL_POS, null
).each { AssetCategory category ->
    def code = readCode(category.getCategoryId())
    out << "  existing: ${category.getTitle(LocaleUtil.US).padRight(16)} code=${code ?: '(none — will not appear in the dropdown)'}\n"

    if (code != null) {
        existing.put(code.toLowerCase(), category)
    }
}

out << "\n"

def added = 0
def skipped = 0
def failed = 0

LANGUAGES.each { language ->
    def code = language.code

    if (existing.containsKey(code.toLowerCase())) {
        out << "SKIP   ${code.padRight(4)} ${language.en} — already present\n"
        skipped++
        return
    }

    if (DRY_RUN) {
        out << "WOULD ADD ${code.padRight(4)} ${language.en} / ${language.ar}\n"
        added++
        return
    }

    try {
        def titleMap = [:]
        titleMap.put(LocaleUtil.fromLanguageId("en_US"), language.en)
        titleMap.put(LocaleUtil.fromLanguageId("ar_SA"), language.ar)

        def serviceContext = new ServiceContext()
        serviceContext.setCompanyId(companyId)
        serviceContext.setUserId(userId)
        serviceContext.setScopeGroupId(globalGroup.getGroupId())
        serviceContext.setAddGroupPermissions(true)
        serviceContext.setAddGuestPermissions(true)

        def category = AssetCategoryLocalServiceUtil.addCategory(
                null,                            // externalReferenceCode (auto)
                userId,
                globalGroup.getGroupId(),
                0L,                              // parentCategoryId — top level
                titleMap,
                [:],                             // descriptionMap
                vocabulary.getVocabularyId(),
                new String[0],                   // properties set explicitly below
                serviceContext)

        SystemBundleUtil.callService(propertyServiceName, { service ->
            service.addCategoryProperty(
                    userId, category.getCategoryId(), PROPERTY_KEY, code)
        })

        def stored = readCode(category.getCategoryId())

        if (code.equals(stored)) {
            out << "ADDED  ${code.padRight(4)} ${language.en} (categoryId ${category.getCategoryId()})\n"
            added++
        }
        else {
            out << "WARN   ${code.padRight(4)} ${language.en} — created but code property reads '${stored}'\n"
            failed++
        }
    }
    catch (Exception exception) {
        out << "FAILED ${code.padRight(4)} ${language.en} — ${exception.getClass().getSimpleName()}: ${exception.getMessage()}\n"
        failed++
    }
}

out << "\n"
out << "${DRY_RUN ? 'Would add' : 'Added'}: ${added}   Skipped: ${skipped}   Failed: ${failed}\n"

if (!DRY_RUN && added > 0) {
    out << "\nIMPORTANT: the categories endpoint caches its results.\n"
    out << "Go to Server Administration -> Resources -> 'Clear content cached by this VM',\n"
    out << "otherwise the new languages will not appear in the sign-up form.\n"
}

println out
