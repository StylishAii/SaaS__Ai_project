/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aisaaskpirabaharan.blob.core.windows.net',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
