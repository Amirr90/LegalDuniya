import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const remoteHosts: { protocol: "https"; hostname: string; pathname: string }[] = [
  { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
];

// Optional production media host (S3, CloudFront, Vercel Blob, Cloudinary, …).
// Set MEDIA_HOSTNAME in `.env.production` (no protocol, just the host).
const mediaHost = process.env.MEDIA_HOSTNAME?.trim();
if (mediaHost) {
  remoteHosts.push({ protocol: "https", hostname: mediaHost, pathname: "/**" });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: remoteHosts,
  },
  // Required by Payload v3 admin under Next.js 16 + Turbopack.
  turbopack: {},
};

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
});
