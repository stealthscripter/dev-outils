import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // Vercel Blob example
      {
        protocol: 'https',
        hostname: 'lds2vlqy1y5j0ypj.public.blob.vercel-storage.com',
        pathname: '/icons/**',
      },
      // Custom domain example (if you use one for blob)
      {
        protocol: "https",
        hostname: "cdn.yourapp.com", // your custom image domain
        pathname: "/**",
      },
      // Example for Neon DB or other static URLs
      {
        protocol: "https",
        hostname: "ep-blue-morning-a1jabrot-pooler.ap-southeast-1.aws.neon.tech",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;