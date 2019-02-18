const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  mode: 'production',
  target: 'web',
  node: {
    fs: 'empty'
  },
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src', 'index')
  ],
  output: {
    path: path.join(__dirname, 'deploy', 'dist'),
    filename: 'js/app-[hash].js',
    publicPath: 'dist/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify('production')}
    }),
    new LodashModuleReplacementPlugin({'collections': true, 'shorthands': true}),
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /cs/),
    // new ExtractTextPlugin({filename: 'css/app-[hash].css'}),
    new MiniCssExtractPlugin({filename: 'css/app-[hash].css', chunkFilename: 'css/chunk-[id].css'}),
    new HtmlWebpackPlugin({
      title: 'QWERTY Administrace',
      filename: '../index.html',
      hash: false,
      template: 'index.tpl.html',
      xhtml: true,
      appMountId: 'root',
      mobile: true,
      favicons: false,
      minify: false,
      inject: false
    })
  ],

  module: {
    rules: [
      {
        test: /\.(css|json|eot|svg|ttf|woff|gif)$/,
        include: [path.join(__dirname, 'static')],
        use: ['file-loader?name=[path][name].[ext]']
      }, {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: ['babel-loader', 'webpack-strip-block?start=DEV&end=%2FDEV']
      }, {
        test: /\.css$/,
        exclude: [path.join(__dirname, 'static')],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[local]_[hash:base64:3]',
              normalprefixer: [ autoprefixer({ browsers: ['>.25%'] }) ]
            }
          }
        ]
      }, {
        test: /\.less$/,
        exclude: [path.join(__dirname, 'static'), /node_modules/],
        use: [
          MiniCssExtractPlugin.loader,
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
      }, {
        test: /\.jsx?$/,
        include: [path.join(__dirname, 'vendor')],
        use: 'file-loader?name=assets/[path][name]-[hash].[ext]'
      }, {
        test: /\.(png|jpg|gif)$/,
        exclude: [path.join(__dirname, 'static'), /node_modules/],
        use: 'file-loader?name=assets/images/[path][name].[ext]'
      }, {
        test: /\.woff(2)?(\?.*)?$/,
        exclude: [path.join(__dirname, 'static'), /node_modules/],
        use: 'url-loader?name=assets/fonts/[path][name].[ext]&limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?.*)?$/,
        exclude: [path.join(__dirname, 'static'), /node_modules/],
        use: 'file-loader?name=assets/fonts/[path][name].[ext]'
      }
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

  watch: false
}
