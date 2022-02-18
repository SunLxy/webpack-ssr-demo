const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  mode: "production",
  // 入口文件
  entry: path.resolve(__dirname, "./src/client.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/public/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_moudles/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),//清理dist文件夹
    new AssetsPlugin({
      path: path.resolve(__dirname, "./dist"),
      filename: 'assets.json',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
}