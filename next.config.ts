import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.imgur.com", "images.unsplash.com"],
    unoptimized: true,
  },
};

export default nextConfig;
