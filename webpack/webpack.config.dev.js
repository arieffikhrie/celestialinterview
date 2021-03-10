const Path = require("path");
const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  output: {
    publicPath: '/',
  },
  devServer: {
    inline: true,
    watchContentBase: true,
    contentBase: Path.resolve(__dirname, "../src/pages"),
    hot: true,
    publicPath: '/',
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: Path.resolve(__dirname, "../src/public"),
        }
      ],
    }),
    new Webpack.HotModuleReplacementPlugin({
      // Options...
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, "../src"),
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, "../src"),
        loader: "babel-loader",
      },
      {
        test: /\.s?css$/i,
        use: ["style-loader", "css-loader?sourceMap=true", "sass-loader"],
      },
    ],
  },
});
