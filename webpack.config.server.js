const path = require("path")
const nodeExternals = require('webpack-node-externals');
const webpack = require("webpack")

module.exports = {
  mode: "production",
  target: "node",
  // 入口文件
  entry: path.resolve(__dirname, "./src/server.js"),
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "ssr.js",
    libraryTarget: "commonjs2"
  },
  externals: [nodeExternals()],
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
    new webpack.DefinePlugin({
      Asset_Manifest_Path: JSON.stringify(path.resolve(process.cwd(), "build/asset-manifest.json"))
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
}