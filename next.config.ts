import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Required by Payload v3 admin under Next.js 16 + Turbopack.
  turbopack: {},
};

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
});
