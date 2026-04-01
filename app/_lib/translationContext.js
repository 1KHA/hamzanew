// let translations = {};

// export function setTranslations(data) {
//   translations = data;
// }

// export function t(key) {
//   return translations[key] || key;
// }

export function t(key, translations) {
  return translations && translations[key] ? translations[key] : key;
}
