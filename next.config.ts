import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  optimizePackageImports: ["platformscode-new-react"],
  images: {
    formats: ["image/webp"],
  },
};

export default nextConfig;
