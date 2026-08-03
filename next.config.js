/** @type {import('next').NextConfig} */
const nextConfig = {
  // Forzar compilador Webpack
  compiler: {
    legacyWebpack: true,
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
