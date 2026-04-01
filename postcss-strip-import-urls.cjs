// /**
//  * PostCSS plugin: strip-import-urls
//  *
//  * Removes @import url(...) rules from bundled CSS.
//  * The platformscode-new-react library embeds Google Font @import statements
//  * inside its component CSS. These end up in Next.js's bundled stylesheets
//  * and trigger Chrome warnings because they appear after other CSS rules.
//  *
//  * Fonts are loaded correctly via <link> tags in layout.tsx instead.
//  */
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

// module.exports = stripImportUrls;
