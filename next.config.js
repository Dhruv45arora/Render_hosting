/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Old CRA lives in /src (jsx + react-router). Do not treat it as Next pages.
  pageExtensions: ["ts", "tsx"],
  images: {
    formats: ["image/webp", "image/avif"],
  },
  // Prefer apex host to match SITE_URL / canonicals (GSC currently splits www + non-www).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.aroracars.com" }],
        destination: "https://aroracars.com/:path*",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.watchOptions = { ...(config.watchOptions || {}), ignored: ["**/src/**"] };
    return config;
  },
};

module.exports = nextConfig;
