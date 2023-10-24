const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    emotion: true,
  },
  webpack: (config) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "./src/schema",
            to: "static/chunks",
          },
        ],
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
