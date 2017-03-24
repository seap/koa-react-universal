import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import { paths } from '../../config'

export default {
  context: paths.root,
  devtool: 'cheap-module-source-map',
  entry: {
    app: ['./src/index', `webpack-hot-middleware/client?path=${paths.compilerPublic}__webpack_hmr`],
    vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk']
  },
  output: {
    path: paths.dist,
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: paths.compilerPublic
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude : /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['env'],
          //   plugins: ['transform-runtime']
          // }
        }
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true
    }),
    new HtmlWebpackPlugin({
      template : `${paths.client}/index.html`,
      hash     : false,
      // favicon  : project.paths.public('favicon.ico'),
      filename : 'index.html',
      inject   : 'body',
      minify   : {
        collapseWhitespace : true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor']
    })
  ]
}
