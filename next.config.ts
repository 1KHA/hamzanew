import type { NextConfig } from "next";

/**
 * Webpack plugin that strips @import url(...) rules from bundled CSS files.
 *
 * The platformscode-new-react library embeds Google Font @import statements
 * inside its component CSS. Next.js bundles these into layout.css / page.css,
 * causing Chrome warnings because @import rules must appear at the top of a
 * stylesheet. Fonts are loaded correctly via <link> tags in layout.tsx instead.
 */
class StripCssImportUrlsPlugin {
  apply(compiler: any) {
    compiler.hooks.compilation.tap(
      "StripCssImportUrls",
      (compilation: any) => {
        compilation.hooks.processAssets.tap(
          {
            name: "StripCssImportUrls",
            stage:
              compiler.webpack.Compilation
                .PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
          },
          (assets: Record<string, any>) => {
            for (const [name, asset] of Object.entries(assets)) {
              if (!name.endsWith(".css")) continue;
              const original: string = asset.source();
              const cleaned = original.replace(
                /@import url\(["']?https?:\/\/[^)]+["']?\);?\n?/g,
                ""
              );
              if (cleaned !== original) {
                compilation.updateAsset(
                  name,
                  new compiler.webpack.sources.RawSource(cleaned)
                );
              }
            }
          }
        );
      }
    );
  }
}

class InjectFontDisplaySwapPlugin {
  apply(compiler: any) {
    compiler.hooks.compilation.tap(
      "InjectFontDisplaySwap",
      (compilation: any) => {
        compilation.hooks.processAssets.tap(
          {
            name: "InjectFontDisplaySwap",
            stage:
              compiler.webpack.Compilation
                .PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
          },
          (assets: Record<string, any>) => {
            for (const [name, asset] of Object.entries(assets)) {
              if (!name.endsWith(".css")) continue;
              const original: string = asset.source();
              // Add font-display: swap to any @font-face block missing it
              const patched = original.replace(
                /(@font-face\s*\{[^}]*?)(font-display\s*:[^;]+;)?([^}]*?\})/gs,
                (match: string, before: string, existing: string, after: string) => {
                  if (existing) return match;
                  return before + "font-display:swap;" + after;
                }
              );
              if (patched !== original) {
                compilation.updateAsset(
                  name,
                  new compiler.webpack.sources.RawSource(patched)
                );
              }
            }
          }
        );
      }
    );
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // optimizePackageImports: ["platformscode-new-react"],
  images: {
    formats: ["image/webp"],
  },
  webpack(config, { webpack }) {
    config.plugins.push(new StripCssImportUrlsPlugin());
    config.plugins.push(new InjectFontDisplaySwapPlugin());
    return config;
  },
};

export default nextConfig;
