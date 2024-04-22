/* config-overrides.js */
const webpack = require("webpack");

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.tsx?$/,
    loader: "ts-loader",
    exclude: /node_modules/,
    options: {
      transpileOnly: true,
      configFile: "tsconfig.json",
    },
  });

  config.resolve.extensions = ["*", ".js", ".jsx", ".ts", ".tsx"];

  config.resolve.fallback = {
    buffer: require.resolve("buffer/"),
    url: require.resolve("url"),
    fs: require.resolve("fs"),
    assert: require.resolve("assert/"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify"),
    path: require.resolve("path-browserify"),
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
