var dev = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production'
var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var config = require(dev ? './webpack.config' : './webpack.config.prod')

const LISTEN_PORT = 3002

new webpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: dev,
  inline: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  historyApiFallback: {
    index: 'index.html'
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}).listen(LISTEN_PORT, 'localhost', function (err, result) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at localhost:' + LISTEN_PORT)
  if (!dev) {
    console.log('WARNING! You are running PRODUCTION config.')
  }
})
