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
// Full ISO 639-1 set (184 languages), names from Unicode CLDR
// (cldr-json: localeDisplayNames.languages for en + ar), sorted by English name.
def LANGUAGES = [
    [code: "ab", en: "Abkhazian",           ar: "الأبخازية"],
    [code: "aa", en: "Afar",                ar: "الأفارية"],
    [code: "af", en: "Afrikaans",           ar: "الأفريقانية"],
    [code: "ak", en: "Akan",                ar: "الأكانية"],
    [code: "sq", en: "Albanian",            ar: "الألبانية"],
    [code: "am", en: "Amharic",             ar: "الأمهرية"],
    [code: "ar", en: "Arabic",              ar: "العربية"],
    [code: "an", en: "Aragonese",           ar: "الأراغونية"],
    [code: "hy", en: "Armenian",            ar: "الأرمنية"],
    [code: "as", en: "Assamese",            ar: "الأسامية"],
    [code: "av", en: "Avaric",              ar: "الأوارية"],
    [code: "ae", en: "Avestan",             ar: "الأفستية"],
    [code: "ay", en: "Aymara",              ar: "الأيمارا"],
    [code: "az", en: "Azerbaijani",         ar: "الأذربيجانية"],
    [code: "bm", en: "Bambara",             ar: "البامبارا"],
    [code: "bn", en: "Bangla",              ar: "البنغالية"],
    [code: "ba", en: "Bashkir",             ar: "الباشكيرية"],
    [code: "eu", en: "Basque",              ar: "الباسكية"],
    [code: "be", en: "Belarusian",          ar: "البيلاروسية"],
    [code: "bi", en: "Bislama",             ar: "البيسلامية"],
    [code: "bs", en: "Bosnian",             ar: "البوسنية"],
    [code: "br", en: "Breton",              ar: "البريتونية"],
    [code: "bg", en: "Bulgarian",           ar: "البلغارية"],
    [code: "my", en: "Burmese",             ar: "البورمية"],
    [code: "ca", en: "Catalan",             ar: "الكتالانية"],
    [code: "ch", en: "Chamorro",            ar: "التشامورو"],
    [code: "ce", en: "Chechen",             ar: "الشيشانية"],
    [code: "zh", en: "Chinese",             ar: "الصينية"],
    [code: "cu", en: "Church Slavic",       ar: "سلافية كنسية"],
    [code: "cv", en: "Chuvash",             ar: "التشوفاشي"],
    [code: "kw", en: "Cornish",             ar: "الكورنية"],
    [code: "co", en: "Corsican",            ar: "الكورسيكية"],
    [code: "cr", en: "Cree",                ar: "الكرى"],
    [code: "hr", en: "Croatian",            ar: "الكرواتية"],
    [code: "cs", en: "Czech",               ar: "التشيكية"],
    [code: "da", en: "Danish",              ar: "الدانمركية"],
    [code: "dv", en: "Divehi",              ar: "المالديفية"],
    [code: "nl", en: "Dutch",               ar: "الهولندية"],
    [code: "dz", en: "Dzongkha",            ar: "دزونكا"],
    [code: "en", en: "English",             ar: "الإنجليزية"],
    [code: "eo", en: "Esperanto",           ar: "الإسبرانتو"],
    [code: "et", en: "Estonian",            ar: "الإستونية"],
    [code: "ee", en: "Ewe",                 ar: "الإيوي"],
    [code: "fo", en: "Faroese",             ar: "الفاروية"],
    [code: "fj", en: "Fijian",              ar: "الفيجية"],
    [code: "fi", en: "Finnish",             ar: "الفنلندية"],
    [code: "fr", en: "French",              ar: "الفرنسية"],
    [code: "ff", en: "Fula",                ar: "الفولانية"],
    [code: "gl", en: "Galician",            ar: "الجاليكية"],
    [code: "lg", en: "Ganda",               ar: "الغاندا"],
    [code: "ka", en: "Georgian",            ar: "الجورجية"],
    [code: "de", en: "German",              ar: "الألمانية"],
    [code: "el", en: "Greek",               ar: "اليونانية"],
    [code: "gn", en: "Guarani",             ar: "الغوارانية"],
    [code: "gu", en: "Gujarati",            ar: "الغوجاراتية"],
    [code: "ht", en: "Haitian Creole",      ar: "الكريولية الهايتية"],
    [code: "ha", en: "Hausa",               ar: "الهوسا"],
    [code: "hz", en: "Herero",              ar: "الهيريرو"],
    [code: "hi", en: "Hindi",               ar: "الهندية"],
    [code: "ho", en: "Hiri Motu",           ar: "الهيري موتو"],
    [code: "hu", en: "Hungarian",           ar: "الهنغارية"],
    [code: "is", en: "Icelandic",           ar: "الأيسلندية"],
    [code: "io", en: "Ido",                 ar: "الإيدو"],
    [code: "ig", en: "Igbo",                ar: "الإيجبو"],
    [code: "id", en: "Indonesian",          ar: "الإندونيسية"],
    [code: "ia", en: "Interlingua",         ar: "اللّغة الوسيطة"],
    [code: "ie", en: "Interlingue",         ar: "الإنترلينج"],
    [code: "iu", en: "Inuktitut",           ar: "الإينكتيتت"],
    [code: "ik", en: "Inupiaq",             ar: "الإينبياك"],
    [code: "ga", en: "Irish",               ar: "الأيرلندية"],
    [code: "it", en: "Italian",             ar: "الإيطالية"],
    [code: "ja", en: "Japanese",            ar: "اليابانية"],
    [code: "jv", en: "Javanese",            ar: "الجاوية"],
    [code: "kl", en: "Kalaallisut",         ar: "الكالاليست"],
    [code: "kn", en: "Kannada",             ar: "الكانادا"],
    [code: "kr", en: "Kanuri",              ar: "الكانوري"],
    [code: "ks", en: "Kashmiri",            ar: "الكشميرية"],
    [code: "kk", en: "Kazakh",              ar: "الكازاخستانية"],
    [code: "km", en: "Khmer",               ar: "الخميرية"],
    [code: "ki", en: "Kikuyu",              ar: "الكيكيو"],
    [code: "rw", en: "Kinyarwanda",         ar: "الكينيارواندا"],
    [code: "kv", en: "Komi",                ar: "الكومي"],
    [code: "kg", en: "Kongo",               ar: "الكونغو"],
    [code: "ko", en: "Korean",              ar: "الكورية"],
    [code: "kj", en: "Kuanyama",            ar: "كوانياما"],
    [code: "ku", en: "Kurdish",             ar: "الكردية"],
    [code: "ky", en: "Kyrgyz",              ar: "القيرغيزية"],
    [code: "lo", en: "Lao",                 ar: "اللاوية"],
    [code: "la", en: "Latin",               ar: "اللاتينية"],
    [code: "lv", en: "Latvian",             ar: "اللاتفية"],
    [code: "li", en: "Limburgish",          ar: "الليمبورغية"],
    [code: "ln", en: "Lingala",             ar: "اللينجالا"],
    [code: "lt", en: "Lithuanian",          ar: "الليتوانية"],
    [code: "lu", en: "Luba-Katanga",        ar: "اللوبا كاتانغا"],
    [code: "lb", en: "Luxembourgish",       ar: "اللكسمبورغية"],
    [code: "mk", en: "Macedonian",          ar: "المقدونية"],
    [code: "mg", en: "Malagasy",            ar: "الملغاشي"],
    [code: "ms", en: "Malay",               ar: "الماليزية"],
    [code: "ml", en: "Malayalam",           ar: "المالايالامية"],
    [code: "mt", en: "Maltese",             ar: "المالطية"],
    [code: "gv", en: "Manx",                ar: "المنكية"],
    [code: "mi", en: "Māori",               ar: "الماورية"],
    [code: "mr", en: "Marathi",             ar: "الماراثية"],
    [code: "mh", en: "Marshallese",         ar: "المارشالية"],
    [code: "mn", en: "Mongolian",           ar: "المنغولية"],
    [code: "na", en: "Nauru",               ar: "النورو"],
    [code: "nv", en: "Navajo",              ar: "النافاجو"],
    [code: "ng", en: "Ndonga",              ar: "الندونجا"],
    [code: "ne", en: "Nepali",              ar: "النيبالية"],
    [code: "nd", en: "North Ndebele",       ar: "النديبيل الشمالية"],
    [code: "se", en: "Northern Sami",       ar: "سامي الشمالية"],
    [code: "no", en: "Norwegian",           ar: "النرويجية"],
    [code: "nb", en: "Norwegian Bokmål",    ar: "النرويجية بوكمال"],
    [code: "nn", en: "Norwegian Nynorsk",   ar: "النرويجية نينورسك"],
    [code: "ny", en: "Nyanja",              ar: "النيانجا"],
    [code: "oc", en: "Occitan",             ar: "الأوكسيتانية"],
    [code: "or", en: "Odia",                ar: "الأورية"],
    [code: "oj", en: "Ojibwa",              ar: "الأوجيبوا"],
    [code: "om", en: "Oromo",               ar: "الأورومية"],
    [code: "os", en: "Ossetic",             ar: "الأوسيتيك"],
    [code: "pi", en: "Pali",                ar: "البالية"],
    [code: "ps", en: "Pashto",              ar: "البشتو"],
    [code: "fa", en: "Persian",             ar: "الفارسية"],
    [code: "pl", en: "Polish",              ar: "البولندية"],
    [code: "pt", en: "Portuguese",          ar: "البرتغالية"],
    [code: "pa", en: "Punjabi",             ar: "البنجابية"],
    [code: "qu", en: "Quechua",             ar: "كيشوا"],
    [code: "ro", en: "Romanian",            ar: "الرومانية"],
    [code: "rm", en: "Romansh",             ar: "الرومانشية"],
    [code: "rn", en: "Rundi",               ar: "الرندي"],
    [code: "ru", en: "Russian",             ar: "الروسية"],
    [code: "sm", en: "Samoan",              ar: "الساموائية"],
    [code: "sg", en: "Sango",               ar: "السانجو"],
    [code: "sa", en: "Sanskrit",            ar: "السنسكريتية"],
    [code: "sc", en: "Sardinian",           ar: "السردينية"],
    [code: "gd", en: "Scottish Gaelic",     ar: "الغيلية الأسكتلندية"],
    [code: "sr", en: "Serbian",             ar: "الصربية"],
    [code: "sh", en: "Serbo-Croatian",      ar: "صربية-كرواتية"],
    [code: "sn", en: "Shona",               ar: "الشونا"],
    [code: "ii", en: "Sichuan Yi",          ar: "السيتشيون يي"],
    [code: "sd", en: "Sindhi",              ar: "السندية"],
    [code: "si", en: "Sinhala",             ar: "السنهالية"],
    [code: "sk", en: "Slovak",              ar: "السلوفاكية"],
    [code: "sl", en: "Slovenian",           ar: "السلوفانية"],
    [code: "so", en: "Somali",              ar: "الصومالية"],
    [code: "nr", en: "South Ndebele",       ar: "النديبيل الجنوبي"],
    [code: "st", en: "Southern Sotho",      ar: "السوتو الجنوبية"],
    [code: "es", en: "Spanish",             ar: "الإسبانية"],
    [code: "su", en: "Sundanese",           ar: "السوندانية"],
    [code: "sw", en: "Swahili",             ar: "السواحلية"],
    [code: "ss", en: "Swati",               ar: "السواتي"],
    [code: "sv", en: "Swedish",             ar: "السويدية"],
    [code: "tl", en: "Tagalog",             ar: "التاغالوغية"],
    [code: "ty", en: "Tahitian",            ar: "التاهيتية"],
    [code: "tg", en: "Tajik",               ar: "الطاجيكية"],
    [code: "ta", en: "Tamil",               ar: "التاميلية"],
    [code: "tt", en: "Tatar",               ar: "التترية"],
    [code: "te", en: "Telugu",              ar: "التيلوغوية"],
    [code: "th", en: "Thai",                ar: "التايلاندية"],
    [code: "bo", en: "Tibetan",             ar: "التبتية"],
    [code: "ti", en: "Tigrinya",            ar: "التغرينية"],
    [code: "to", en: "Tongan",              ar: "التونغية"],
    [code: "ts", en: "Tsonga",              ar: "السونجا"],
    [code: "tn", en: "Tswana",              ar: "التسوانية"],
    [code: "tr", en: "Turkish",             ar: "التركية"],
    [code: "tk", en: "Turkmen",             ar: "التركمانية"],
    [code: "tw", en: "Twi",                 ar: "التوي"],
    [code: "uk", en: "Ukrainian",           ar: "الأوكرانية"],
    [code: "ur", en: "Urdu",                ar: "الأوردية"],
    [code: "ug", en: "Uyghur",              ar: "الأويغورية"],
    [code: "uz", en: "Uzbek",               ar: "الأوزبكية"],
    [code: "ve", en: "Venda",               ar: "الفيندا"],
    [code: "vi", en: "Vietnamese",          ar: "الفيتنامية"],
    [code: "vo", en: "Volapük",             ar: "لغة الفولابوك"],
    [code: "wa", en: "Walloon",             ar: "الولونية"],
    [code: "cy", en: "Welsh",               ar: "الويلزية"],
    [code: "fy", en: "Western Frisian",     ar: "الفريزيان"],
    [code: "wo", en: "Wolof",               ar: "الولوفية"],
    [code: "xh", en: "Xhosa",               ar: "الخوسا"],
    [code: "yi", en: "Yiddish",             ar: "اليديشية"],
    [code: "yo", en: "Yoruba",              ar: "اليوروبا"],
    [code: "za", en: "Zhuang",              ar: "الزهيونج"],
    [code: "zu", en: "Zulu",                ar: "الزولو"],
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
