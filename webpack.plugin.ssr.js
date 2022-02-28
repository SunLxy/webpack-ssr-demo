const webpack = require("webpack")
const path = require("path")
const nodeExternals = require('webpack-node-externals');

/**
 * 1. 创建一个子程序
 * 2. 对入口文件进行添加
 * **/

class SSRWebpackPlugin {
  constructor() { }
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("SSRWebpackPlugin", (compilation) => {
      const childCompiler = compilation.createChildCompiler("SSRWebpackPlugin", {
        path: path.join(process.cwd(), "/dist"),
        filename: "ssr.js",
        library: {
          type: "commonjs2"
        }
      }, [])
      new webpack.library.EnableLibraryPlugin("commonjs2").apply(childCompiler);
      new webpack.optimize.LimitChunkCountPlugin({ "maxChunks": 1 }).apply(childCompiler);
      new webpack.EntryPlugin(compilation.compiler.context, path.join(process.cwd(), "src/server.js")).apply(childCompiler)
      new webpack.ExternalsPlugin("noode", [nodeExternals()]).apply(childCompiler)


      childCompiler.runAsChild((err, entries, compilation) => {
        // 文件加载
        if (err) {
          console.log(err)
          return;
        }
      })
    })
  }
}

module.exports = { SSRWebpackPlugin }