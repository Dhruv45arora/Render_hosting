/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/webp", "image/avif"],
  },
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
