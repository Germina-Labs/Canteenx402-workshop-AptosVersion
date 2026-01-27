import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        got: false,
        "node-fetch": false,
        http: false,
        https: false,
        zlib: false,
        stream: false,
        crypto: false,
        os: false,
        tty: false,
        fs: false,
        path: false,
        child_process: false,
        net: false,
        tls: false,
      };
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^got$/,
        })
      );
    }
    return config;
  },
};

export default nextConfig;
