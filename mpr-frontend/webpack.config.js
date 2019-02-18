var path = require('path')
var webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
  mode: 'development',
  target: 'web',
  node: {
    fs: 'empty'
  },
  devtool: 'eval',
  devServer: {
    inline: true
  },
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:3002',
    'webpack/hot/dev-server',
    path.join(__dirname, 'src', 'index')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify('development')}
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /cs/)
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: ['babel-loader', 'webpack-strip-block?start=PROD&end=%2FPROD']
      },
      {
        test: /\.css$/,
        exclude: path.join(__dirname, 'vendor'),
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        exclude: path.join(__dirname, 'vendor'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[local]_[hash:base64:3]',
              normalprefixer: [ autoprefixer({ browsers: ['>.25%'] }) ]
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(jsx?|css)$/,
        include: [path.join(__dirname, 'vendor')],
        use: 'file-loader?name=assets/[path][name]-[hash].[ext]'
      },
      { test: /\.(png|jpg|gif)$/, use: 'file-loader' },
      { test: /\.(woff2?|eot|ttf|svg|)(\?.*)?$/, use: 'file-loader' }
    ]
  },

  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'styles'),
      'node_modules'
    ]
  },

  watch: true
}
