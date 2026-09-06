/*
 * Adds UTC-offset entries to the "Time zone" vocabulary in the Global site,
 * each with the `code` category property the frontend relies on.
 *
 * Feeds the "المنطقة الزمنية" dropdown on the last sign-up step
 * (app/(main)/sign-up/LocationInfo.tsx) and the profile-update form. The
 * selected `code` is stored verbatim in the UserProfile.timeZone column
 * (a plain string), so the dropdown is the single source of truth for values.
 *
 * Run from: Control Panel -> Server Administration -> Script (language: Groovy)
 *
 * Why the `code` property matters: CategoryRestController only returns a
 * category if it has a property named `code` (it becomes the `key` in the JSON
 * the sign-up form submits). A category without it is silently skipped and the
 * time zone never appears in the dropdown.
 *
 * Safe to re-run: existing entries are detected by their `code` and skipped.
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

def DRY_RUN = true                       // true = report only, false = write
def VOCABULARY_NAME = "Time zone"
def PROPERTY_KEY = "code"

//  code  = IANA zone ID stored in the profile — matches the existing category
//          convention (the pre-existing Riyadh entry has code "Asia/Riyadh")
//  en/ar = category title shown in each locale
// One entry per standard (non-DST) UTC offset, 35 total; the code is the
// offset group's anchor zone. Offsets computed from the IANA tz database (via
// ICU); city names from Unicode CLDR (cldr-json: dates.timeZoneNames
// exemplarCity for en + ar). Sorted west to east.
def TIMEZONES = [
    [code: "Etc/GMT+12",           en: "GMT-12:00",                                    ar: "GMT-12:00"],
    [code: "Pacific/Pago_Pago",    en: "(GMT-11:00) Pago Pago, Midway Atoll",          ar: "(GMT-11:00) باغو باغو، ميدواي"],
    [code: "Pacific/Honolulu",     en: "(GMT-10:00) Honolulu",                         ar: "(GMT-10:00) هونولولو"],
    [code: "Pacific/Marquesas",    en: "(GMT-09:30) Marquesas Islands",                ar: "(GMT-09:30) ماركيساس"],
    [code: "America/Anchorage",    en: "(GMT-09:00) Anchorage",                        ar: "(GMT-09:00) أنشوراج"],
    [code: "America/Los_Angeles",  en: "(GMT-08:00) Los Angeles, Vancouver",           ar: "(GMT-08:00) لوس انجلوس، فانكوفر"],
    [code: "America/Denver",       en: "(GMT-07:00) Denver, Phoenix",                  ar: "(GMT-07:00) دنفر، فينكس"],
    [code: "America/Chicago",      en: "(GMT-06:00) Chicago, Mexico City",             ar: "(GMT-06:00) شيكاغو، مكسيكو سيتي"],
    [code: "America/New_York",     en: "(GMT-05:00) New York, Toronto, Bogotá",        ar: "(GMT-05:00) نيويورك، تورونتو، بوغوتا"],
    [code: "America/Halifax",      en: "(GMT-04:00) Halifax, Caracas, Santiago",       ar: "(GMT-04:00) هاليفاكس، كاراكاس، سانتياغو"],
    [code: "America/St_Johns",     en: "(GMT-03:30) St. John’s",                       ar: "(GMT-03:30) سانت جونس"],
    [code: "America/Sao_Paulo",    en: "(GMT-03:00) São Paulo, Buenos Aires",          ar: "(GMT-03:00) ساو باولو، بوينوس أيرس"],
    [code: "America/Noronha",      en: "(GMT-02:00) Fernando de Noronha",              ar: "(GMT-02:00) نوروناه"],
    [code: "Atlantic/Azores",      en: "(GMT-01:00) Azores, Cape Verde",               ar: "(GMT-01:00) أزورس، الرأس الأخضر"],
    [code: "Europe/London",        en: "(GMT+00:00) London, Accra",                    ar: "(GMT+00:00) لندن، أكرا"],
    [code: "Europe/Paris",         en: "(GMT+01:00) Paris, Berlin, Algiers",           ar: "(GMT+01:00) باريس، برلين، الجزائر"],
    [code: "Africa/Cairo",         en: "(GMT+02:00) Cairo, Athens, Johannesburg",      ar: "(GMT+02:00) القاهرة، أثينا، جوهانسبرغ"],
    [code: "Asia/Riyadh",          en: "(GMT+03:00) Riyadh, Moscow, Nairobi",          ar: "(GMT+03:00) الرياض، موسكو، نيروبي"],
    [code: "Asia/Tehran",          en: "(GMT+03:30) Tehran",                           ar: "(GMT+03:30) طهران"],
    [code: "Asia/Dubai",           en: "(GMT+04:00) Dubai, Baku",                      ar: "(GMT+04:00) دبي، باكو"],
    [code: "Asia/Kabul",           en: "(GMT+04:30) Kabul",                            ar: "(GMT+04:30) كابول"],
    [code: "Asia/Karachi",         en: "(GMT+05:00) Karachi, Tashkent, Almaty",        ar: "(GMT+05:00) كراتشي، طشقند، ألماتي"],
    [code: "Asia/Kolkata",         en: "(GMT+05:30) Kolkata, Colombo",                 ar: "(GMT+05:30) كالكتا، كولومبو"],
    [code: "Asia/Kathmandu",       en: "(GMT+05:45) Kathmandu",                        ar: "(GMT+05:45) كاتماندو"],
    [code: "Asia/Dhaka",           en: "(GMT+06:00) Dhaka, Bishkek",                   ar: "(GMT+06:00) دكا، بشكيك"],
    [code: "Asia/Yangon",          en: "(GMT+06:30) Yangon",                           ar: "(GMT+06:30) رانغون"],
    [code: "Asia/Bangkok",         en: "(GMT+07:00) Bangkok, Jakarta",                 ar: "(GMT+07:00) بانكوك، جاكرتا"],
    [code: "Asia/Shanghai",        en: "(GMT+08:00) Shanghai, Singapore, Hong Kong",   ar: "(GMT+08:00) شنغهاي، سنغافورة، هونغ كونغ"],
    [code: "Asia/Tokyo",           en: "(GMT+09:00) Tokyo, Seoul",                     ar: "(GMT+09:00) طوكيو، سول"],
    [code: "Australia/Adelaide",   en: "(GMT+09:30) Adelaide, Darwin",                 ar: "(GMT+09:30) أديليد، دارون"],
    [code: "Australia/Sydney",     en: "(GMT+10:00) Sydney, Brisbane",                 ar: "(GMT+10:00) سيدني، برسيبان"],
    [code: "Pacific/Guadalcanal",  en: "(GMT+11:00) Guadalcanal, Nouméa",              ar: "(GMT+11:00) غوادالكانال، نوميا"],
    [code: "Pacific/Auckland",     en: "(GMT+12:00) Auckland, Fiji",                   ar: "(GMT+12:00) أوكلاند، فيجي"],
    [code: "Pacific/Tongatapu",    en: "(GMT+13:00) Tongatapu, Apia",                  ar: "(GMT+13:00) تونغاتابو، أبيا"],
    [code: "Pacific/Kiritimati",   en: "(GMT+14:00) Kiritimati",                       ar: "(GMT+14:00) كيريتي ماتي"],
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
    out << "  existing: ${category.getTitle(LocaleUtil.US).padRight(40)} code=${code ?: '(none — will not appear in the dropdown)'}\n"

    if (code != null) {
        existing.put(code.toLowerCase(), category)
    }
}

out << "\n"

def added = 0
def skipped = 0
def failed = 0

TIMEZONES.each { zone ->
    def code = zone.code

    if (existing.containsKey(code.toLowerCase())) {
        out << "SKIP   ${code.padRight(21)} ${zone.en} — already present\n"
        skipped++
        return
    }

    if (DRY_RUN) {
        out << "WOULD ADD ${code.padRight(21)} ${zone.en} / ${zone.ar}\n"
        added++
        return
    }

    try {
        def titleMap = [:]
        titleMap.put(LocaleUtil.fromLanguageId("en_US"), zone.en)
        titleMap.put(LocaleUtil.fromLanguageId("ar_SA"), zone.ar)

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
            out << "ADDED  ${code.padRight(21)} ${zone.en} (categoryId ${category.getCategoryId()})\n"
            added++
        }
        else {
            out << "WARN   ${code.padRight(21)} ${zone.en} — created but code property reads '${stored}'\n"
            failed++
        }
    }
    catch (Exception exception) {
        out << "FAILED ${code.padRight(21)} ${zone.en} — ${exception.getClass().getSimpleName()}: ${exception.getMessage()}\n"
        failed++
    }
}

out << "\n"
out << "${DRY_RUN ? 'Would add' : 'Added'}: ${added}   Skipped: ${skipped}   Failed: ${failed}\n"

if (!DRY_RUN && added > 0) {
    out << "\nIMPORTANT: the categories endpoint caches its results.\n"
    out << "Go to Server Administration -> Resources -> 'Clear content cached by this VM',\n"
    out << "otherwise the new time zones will not appear in the sign-up form.\n"
}

println out
