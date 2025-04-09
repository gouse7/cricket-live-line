import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cricketchampion.co.in',
        port: '',
        pathname: '/webroot/img/teams/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
