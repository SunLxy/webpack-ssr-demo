const clientConfig = require("./../webpack.config.client")
const serverConfig = require("./../webpack.config.server")
const webpack = require('webpack');
// Wrap webpack compile in a try catch.
function compile(config) {
  return new Promise((resolve, reject) => {
    let compiler;
    try {
      compiler = webpack(config);
    } catch (e) {
      console.log('compile errors:', [e]); // eslint-disable-line
      reject(e);
      process.exit(1);
    }
    compiler.run((err, stats) => {
      err ? reject(err) : resolve(stats);
    });
  });
}
const build = async () => {

  try {
    const client = await compile(clientConfig)
    if (client) {
      message = client.toString({
        colors: true,
        children: false,
        chunks: false,
        modules: false,
        moduleTrace: false,
        warningsFilter: () => true,
      });
      console.log('client', message)
    }
    const server = await compile(serverConfig)
    if (server) {
      message = server.toString({
        colors: true,
        children: false,
        chunks: false,
        modules: false,
        moduleTrace: false,
        warningsFilter: () => true,
      });
      console.log('server', message)
    }
  }
  catch (err) {
    console.log(err)
  }
}
build()


