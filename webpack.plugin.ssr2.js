const webpack = require("webpack")
const path = require("path")
const nodeExternals = require('webpack-node-externals');
const webapckMerge = require('webpack-merge');

/**
 * 1. 创建一个子程序
 * 2. 对入口文件进行添加
 * **/

class SSRWebpackPlugin {
  constructor() {

  }
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("SSRWebpackPlugin", (compilation) => {

      let plugins = []
      compilation.options.plugins.forEach((plugin) => {
        // if (!(plugin && plugin.constructor && ["HtmlWebpackPlugin", "SSRWebpackPlugin", "MiniCssExtractPlugin"].includes(plugin.constructor.name))) {
        if (!(plugin && plugin.constructor && ["HtmlWebpackPlugin", "SSRWebpackPlugin"].includes(plugin.constructor.name))) {
          plugins.push(plugin)
        }
      })

      // const getUseLoader = (arr) => {
      //   const reslult = arr.filter((item) => {
      //     if (item.loader && /mini-css-extract-plugin\/dist\/loader.js$/.test(item.loader)) {
      //       return false
      //     }
      //     return true
      //   })
      //   return reslult
      // }
      // const newRules = []
      // const rules = compilation.options.module.rules

      // rules.forEach((item) => {
      //   if (item.oneOf) {
      //     let rulesOneOf = []
      //     item.oneOf.forEach((item) => {
      //       if (item.use) {
      //         rulesOneOf.push({ ...item, use: getUseLoader(item.use) })
      //       } else {
      //         rulesOneOf.push(item)
      //       }
      //     })
      //     newRules.push({ ...item, oneOf: rulesOneOf })
      //   } else {
      //     newRules.push(item)
      //   }
      // })

      const childCompiler = compiler.webpack({
        target: "node",
        entry: path.resolve(__dirname, "./src/serverIndex.js"),
        output: {
          path: path.resolve(__dirname, "./build"),
          filename: "ssr.js",
          libraryTarget: "commonjs2",
          library: {
            type: "commonjs2"
          },
        },
        externals: [nodeExternals()],
        module: {
          ...compilation.options.module,
          // rules: newRules
        },
        plugins: plugins,
        resolve: {
          modules: ['node_modules'],
          extensions: ['.ts', '.tsx', '.js', '.json'],
          ...compilation.options.resolve
        }
      })

      childCompiler.hooks.thisCompilation.tap("SSRWebpackPlugin", (Childcompilation) => {
        Childcompilation.hooks.processAssets.tap("SSRWebpackPlugin", (CompilationAssets) => {
          Object.entries(CompilationAssets || {}).forEach(([name, so]) => {
            console.log(name)
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