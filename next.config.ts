import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // React Bits WebGL components call loseContext() on unmount; StrictMode double-mount breaks them in dev
  reactStrictMode: false,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
