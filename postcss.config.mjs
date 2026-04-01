// import tailwindcss from "@tailwindcss/postcss";

/** Strips @import url(...) rules injected by third-party libraries.
 *  Fonts are loaded via <link> tags in layout.tsx instead.
 *  NOTE: Next.js does not support array-format plugins — kept here for reference.
 */
// function stripImportUrls() {
//   return {
//     postcssPlugin: "strip-import-urls",
//     AtRule: {
//       import(atRule) {
//         if (atRule.params.includes("url(")) {
//           atRule.remove();
//         }
//       },
//     },
//   };
// }
// stripImportUrls.postcss = true;

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    // "./postcss-strip-import-urls.cjs": {}, // relative paths not supported by Next.js
  },
  // Array format (not supported by Next.js):
  // plugins: [tailwindcss, stripImportUrls],
};

export default config;
