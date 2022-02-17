const path = require("path")
module.exports = {
  mode: "production",
  target: "node",
  // 入口文件
  entry: path.resolve(__dirname, "./src/client/ssr/routes.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "ssr.js",
    libraryTarget: "commonjs2"
  },
  externals: [],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_moudles/
      }
    ]
  }
}