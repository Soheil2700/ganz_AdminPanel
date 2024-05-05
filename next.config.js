/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   eslint: {
      ignoreDuringBuilds: true,
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'api.ganzcoffee.com',
         },
      ],
   },
};

module.exports = nextConfig;
