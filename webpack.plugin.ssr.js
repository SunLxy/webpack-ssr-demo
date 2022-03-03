const webpack = require("webpack")
const path = require("path")
const nodeExternals = require('webpack-node-externals');

/**
 * 1. 创建一个子程序
 * 2. 对入口文件进行添加
 * **/

class SSRWebpackPlugin {
  constructor() {

  }
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("SSRWebpackPlugin", (compilation) => {
      const childCompiler = compilation.createChildCompiler("SSRWebpackPlugin", {
        path: path.join(process.cwd(), "./build"),
        filename: "ssr.js",
        library: {
          type: "commonjs2"
        },
        libraryTarget: "commonjs2"
      }, [])
      childCompiler.options.target = "node"
      childCompiler.options.output.library.type = "commonjs2"


      new webpack.optimize.LimitChunkCountPlugin({ "maxChunks": 1 }).apply(childCompiler);
      new webpack.EntryPlugin(compilation.compiler.context, path.join(process.cwd(), "src/serverIndex.js")).apply(childCompiler)
      new webpack.ExternalsPlugin(null, [nodeExternals()]).apply(childCompiler)
      new webpack.node.NodeTargetPlugin().apply(childCompiler);

      childCompiler.runAsChild((err, entries, ccompilation) => {
        if (err) {
          console.log(err)
          process.exit(1)
        }
      })
    })
  }
}

module.exports = { SSRWebpackPlugin }