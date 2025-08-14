import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://minio.nutech-integrasi.com/take-home-test/**"),
    ],
  },
};

export default nextConfig;
