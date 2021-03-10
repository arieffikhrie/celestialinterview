const Path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: [
      Path.resolve(__dirname, "../src/scripts/index.js"),
      Path.resolve(__dirname, "../src/styles/index.scss")
    ],
  },
  output: {
    path: Path.join(__dirname, "../build"),
    filename: "js/[name].js",
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false
      }
    }
  },
  externals: {
    jquery: "jQuery"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: Path.resolve(__dirname, "../public"),
          to: "public"
        }
      ],
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {}
      }
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, "../src/pages/index.hbs"),
      title: "Ørsted",
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, "../src/pages/sustainability.hbs"),
      filename: 'sustainability.html',
      title: "Ørsted - Sustainability",
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, "../src/pages/shares.hbs"),
      filename: 'shares.html',
      title: "Ørsted - Shares",
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, "../src/pages/whitepapers.hbs"),
      filename: 'whitepapers.html',
      title: "Ørsted - Shares",
      inject: true,
    })
  ],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../src")
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.(handlebars|hbs)$/,
        use: {
          loader: "handlebars-loader",
          options: {
            partialDirs: [Path.resolve(__dirname, "../src", "partials")],
            runtime: Path.resolve(__dirname, "./config/handlebars"),
            precompileOptions: {
              knownHelpersOnly: false,
            },
          }
        }
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      }
    ]
  }
};
