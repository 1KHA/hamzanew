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

/**
 * Liferay origin that serves /documents/** — the same BASE_URL the data layer
 * already reads (see app/(main)/page.tsx, news, research-library, ...).
 *
 * NOTE: image config is resolved at BUILD time, not at server start. Next
 * serialises it into .next/required-server-files.json, so `next start` uses
 * whatever BASE_URL was set during `next build`. If one build artefact is
 * promoted across environments, this must be rebuilt per environment.
 */
const liferayOrigin = new URL(process.env.BASE_URL ?? "http://localhost:8080");

/**
 * `dangerouslyAllowLocalIP` disables the image optimizer's SSRF guard, which
 * normally blocks loopback/private addresses. Dev Liferay runs on localhost /
 * a private IP, so it is required there — but allowing it in production would
 * let callers proxy arbitrary internal URLs through /_next/image.
 */
const allowLocalHosts = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // optimizePackageImports: ["platformscode-new-react"],
  images: {
    formats: ["image/webp"],
    // Explicit object, not `new URL(...)`: a URL carries `search: ""`, which
    // Next matches exactly and so rejects Liferay's `?version=...&t=...` URLs.
    remotePatterns: [
      {
        protocol: liferayOrigin.protocol.replace(/:$/, "") as "http" | "https",
        hostname: liferayOrigin.hostname,
        port: liferayOrigin.port,
        pathname: "/documents/**",
      },
    ],
    dangerouslyAllowLocalIP: allowLocalHosts,
  },
  webpack(config, { webpack }) {
    config.plugins.push(new StripCssImportUrlsPlugin());
    return config;
  },
};

export default nextConfig;
