const { SSRWebpackPlugin } = require("./webpack.plugin.ssr2")
// const { SSRWebpackPlugin } = require("./webpack.plugin.ssr")
const Path = require("path")
const webpack = require('webpack');

export default (config) => {
  config.entry = {
    main: Path.join(process.cwd(), "src/index.js")
  }
  config.output = {
    ...(config.output || {}),
    path: Path.join(process.cwd(), 'build'),
    filename: "[name].js",
  }
  const plugins = [new SSRWebpackPlugin()]

  let assetManifestPath = Path.resolve(config.output.path, "asset-manifest.json")
  config.plugins.forEach((plugin) => {
    if (!(plugin && plugin.constructor && ["HtmlWebpackPlugin"].includes(plugin.constructor.name))) {
      plugins.push(plugin)
    }
    // 取  WebpackManifestPlugin 存储名称
    if ((plugin && plugin.constructor && ["WebpackManifestPlugin"].includes(plugin.constructor.name))) {
      assetManifestPath = Path.resolve(config.output.path, plugin.options.fileName)
    }
  })
  config.plugins = plugins

  config.plugins.push(
    new webpack.DefinePlugin({
      Asset_Manifest_Path: JSON.stringify(assetManifestPath)
    }),
  );
  return config
}