import type { NextConfig } from "next";

class InjectFontDisplaySwapPlugin {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply(compiler: any) {
    compiler.hooks.compilation.tap("InjectFontDisplaySwapPlugin", (compilation: any) => {
      compilation.hooks.processAssets.tap(
        { name: "InjectFontDisplaySwapPlugin", stage: 100 },
        (assets: Record<string, { source(): string; size(): number }>) => {
          for (const [name, asset] of Object.entries(assets)) {
            if (!name.endsWith(".css")) continue;
            const src = asset.source();
            const injected = src.replace(/@font-face\s*\{([^}]*)\}/g, (match, body) => {
              if (/font-display/.test(body)) return match;
              return match.replace("}", "font-display:swap}");
            });
            if (injected !== src) {
              const { RawSource } = (compiler as any).webpack.sources;
              assets[name] = new RawSource(injected);
            }
          }
        }
      );
    });
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Use critters to inline critical CSS and load the rest async,
    // eliminating render-blocking stylesheets (saves ~1,200ms on FCP/LCP).
    optimizeCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [16, 32, 48, 64, 96, 128, 130, 256, 260, 384],
    qualities: [60, 75],
  },
  // Disable Next.js devtools indicator — Next.js 16 accidentally bundles its
  // devtools overlay (css-loader runtime from rspack, ~840 KB) into the
  // production rootMainFiles, blocking first paint. Disabling the indicator
  // removes that chunk from the initial load.
  devIndicators: false,
  webpack(config, { isServer, dev }) {
    config.plugins.push(new InjectFontDisplaySwapPlugin());

    if (!isServer && !dev) {
      // Next.js 16.1.1 bug: the pre-compiled 815KB devtools bundle
      // (next/dist/compiled/next-devtools) gets pulled into production
      // rootMainFiles via hot-reloader-app.js, blocking first paint.
      // Stub it out with an empty module so webpack can tree-shake everything
      // that depends on it. The previous pattern (/next-devtools/) was wrong —
      // the actual import path is "compiled/next-devtools".
      const webpack = require("webpack");
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /next[\\/]dist[\\/]compiled[\\/]next-devtools/,
          require.resolve("./lib/empty-module.js")
        )
      );
      // Also stub the userspace next-devtools imports (error boundaries, etc.)
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /next[\\/]dist[\\/]next-devtools/,
          require.resolve("./lib/empty-module.js")
        )
      );
      // Next.js 16.1.1 bug: hot-reloader-app.js leaks into production bundles
      // even though it's guarded by NODE_ENV checks in app-router.js, because
      // webpack doesn't eliminate the dynamic require() in the CJS module graph.
      // Stub it out so the ~200KB dev-only HMR code is excluded from rootMainFiles.
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /next[\\/]dist[\\/]client[\\/]dev[\\/]hot-reloader/,
          require.resolve("./lib/empty-module.js")
        )
      );
    }

    return config;
  },
};

export default nextConfig;
