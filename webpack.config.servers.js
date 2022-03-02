const path = require("path")
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "production",
  target: "node",
  // 入口文件
  entry: path.resolve(__dirname, "./src/serverIndex.js"),
  // entry: path.resolve(__dirname, "./src/index.js"),
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
      },
      // {
      //   test: /\.(css)$/,
      //   loader: "css-loader",
      //   exclude: /node_moudles/
      // }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
}