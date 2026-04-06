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

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // optimizePackageImports: ["platformscode-new-react"],
  images: {
    formats: ["image/webp"],
    domains: ["localhost"],
  },
  webpack(config, { webpack }) {
    config.plugins.push(new StripCssImportUrlsPlugin());
    return config;
  },
};

export default nextConfig;
