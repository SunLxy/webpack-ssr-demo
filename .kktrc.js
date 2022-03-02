// const { SSRWebpackPlugin } = require("./webpack.plugin.ssr2")
const { SSRWebpackPlugin } = require("./webpack.plugin.ssr")
const path = require("path")

export default (config) => {
  config.entry = {
    main: path.join(process.cwd(), "src/index.js")
  }
  config.output = {
    ...(config.output || {}),
    path: path.join(process.cwd(), 'build'),
    filename: "[name].js",
    publicPath: "/assets/"
  }
  config.plugins.push(new SSRWebpackPlugin())
  return config
}
// module.exports = (config) => {
//   config.entry = {
//     ssrs: path.join(process.cwd(), "src/serverIndex.js"),
//     main: path.join(process.cwd(), "src/index.js")
//   }
//   config.output = {
//     ...(config.output || {}),
//     path: path.resolve(process.cwd(), 'build'),
//     filename: "[name].js",
//     // publicPath: "/public/"
//   }
//   config.plugins.push(new SSRWebpackPlugin())
//   return config
// }