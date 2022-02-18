const path = require("path")
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "production",
  target: "node",
  // 入口文件
  entry: path.resolve(__dirname, "./src/server.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "ssr.js",
    libraryTarget: "commonjs2"
  },
  externals: [
    nodeExternals(),

  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_moudles/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
}