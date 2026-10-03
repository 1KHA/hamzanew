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
 * Hosts allowed to serve images through /_next/image.
 *
 * The first entry is derived from BASE_URL, but a build made without the right
 * env (or promoted from another environment) would silently produce a pattern
 * that matches nothing — and every image then fails with a 400
 * `"url" parameter is not allowed`. The explicit entries below are the known
 * Liferay origins, so the optimizer keeps working even if BASE_URL is missing
 * at build time.
 *
 * Protocol and port are read from BASE_URL rather than hardcoded: dev serves
 * Liferay over http on :8080, UAT/prod over https on the default port.
 */
const imageRemotePatterns = [
  {
    protocol: liferayOrigin.protocol.replace(/:$/, "") as "http" | "https",
    hostname: liferayOrigin.hostname,
    port: liferayOrigin.port,
    pathname: "/**",
  },
  // UAT / production — Liferay on its own public HTTPS domain
  { protocol: "https" as const, hostname: "hamza-app-uat.ksaa.gov.sa", port: "", pathname: "/**" },
  // Internal dev hosts — Liferay over plain http on 8080
  { protocol: "http" as const, hostname: "10.20.3.124", port: "8080", pathname: "/**" },
  { protocol: "http" as const, hostname: "localhost", port: "8080", pathname: "/**" },
  { protocol: "http" as const, hostname: "127.0.0.1", port: "8080", pathname: "/**" },
];

/**
 * `dangerouslyAllowLocalIP` controls the image optimizer's SSRF guard. With it
 * off, Next resolves the image hostname via DNS and refuses to fetch when the
 * address is private (10.x, 192.168.x, 127.x, ...) — failing with a 400 whose
 * message is `"url" parameter is not allowed`, i.e. *identical* to a
 * remotePatterns mismatch. See fetchExternalImage() in next/dist/server/
 * image-optimizer.js; the giveaway is the server log line
 * `upstream image ... resolved to private ip`.
 *
 * Liferay is reachable only on the internal network here — hamza-app-uat
 * .ksaa.gov.sa resolves to a 10.20.3.x address — so the guard must stay off in
 * every environment, not just dev.
 *
 * This is safe because the guard is not what restricts which hosts may be
 * fetched: `remotePatterns` above is checked first and is an explicit
 * allowlist. Keep those patterns specific — never widen the hostname to a
 * wildcard while this is enabled, or /_next/image becomes an open proxy into
 * the internal network.
 */
const allowLocalHosts = true;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // optimizePackageImports: ["platformscode-new-react"],
  images: {
    formats: ["image/webp"],
    // Explicit objects, not `new URL(...)`: a URL carries `search: ""`, which
    // Next matches exactly and so rejects Liferay's `?version=...&t=...` URLs.
    remotePatterns: imageRemotePatterns,
    dangerouslyAllowLocalIP: allowLocalHosts,
  },
  webpack(config, { webpack }) {
    config.plugins.push(new StripCssImportUrlsPlugin());
    return config;
  },
};

export default nextConfig;
