import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local dev hosts to access Next dev resources (HMR websocket, chunks).
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
