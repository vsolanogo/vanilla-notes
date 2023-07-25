const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    index: ["./src/index.js"],
    styles: ["./src/styles.scss"],
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, "./build"),
  },
  mode: "production",

  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 1,
      minRemainingSize: 0,
      maxSize: 10000,
      minChunks: 1,
      maxAsyncRequests: 50,
      maxInitialRequests: 50,
      automaticNameDelimiter: "~",
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            configFile: path.resolve(__dirname, "babel.config.js"),
            compact: false,
            cacheDirectory: true,
            sourceMaps: false,
          },
        },
      },

      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "sass-loader",
        ],
      },

      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      title: "Task 1",
    }),
  ],
}
