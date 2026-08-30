/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Old CRA lives in /src (jsx + react-router). Do not treat it as Next pages.
  pageExtensions: ["ts", "tsx"],
  images: {
    formats: ["image/webp", "image/avif"],
  },
  webpack: (config) => {
    config.watchOptions = { ...(config.watchOptions || {}), ignored: ["**/src/**"] };
    return config;
  },
};

module.exports = nextConfig;
