import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // Photos are resized ahead of time by scripts/build-photos.mjs and served as static files,
  // so no visitor waits for on-demand resizing. These widths must match WIDTHS in that script.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [384, 640, 828, 1080, 1280, 1600, 2000],
    imageSizes: [256],
  },
  async headers() {
    return [
      {
        source: "/img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  turbopack: {
    rules: {
      // Tailwind only processes the global stylesheet; CSS modules keep Next's own handling.
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
