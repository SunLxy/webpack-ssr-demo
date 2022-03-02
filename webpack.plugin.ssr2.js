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
      const childCompiler = compiler.webpack({
        mode: "production",
        target: "node",
        entry: path.resolve(__dirname, "./src/serverIndex.js"),
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
          ]
        },
        resolve: {
          modules: ['node_modules'],
          extensions: ['.ts', '.tsx', '.js', '.json']
        }
      })

      childCompiler.hooks.thisCompilation.tap("SSRWebpackPlugin", (Childcompilation) => {
        Childcompilation.hooks.processAssets.tap("SSRWebpackPlugin", (CompilationAssets) => {
          Object.entries(CompilationAssets || {}).forEach(([name, so]) => {
            compilation.emitAsset(name, so)
          })
        })
      })

      childCompiler.run((err) => {
        if (err) {
          console.log(err)
          process.exit(1)
        }
      })
    })
  }
}

module.exports = { SSRWebpackPlugin }