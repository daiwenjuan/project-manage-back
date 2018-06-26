/**
 *  Created by daiwenjuan on 2018/6/25 下午12:03.
 */
const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './app/index.js',
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'root': JSON.stringify(process.env.root)
      }
    }),
    new HtmlWebpackPlugin(
      {
        root: '<%= process.env.root %>',
        REDUX_STATE: '<%= process.env.REDUX_STATE %>',
        template: './views/temp.html',
        filename: './views/index.html'
      }
    ),
    new ProgressBarPlugin({ summary: false })
  ]
}