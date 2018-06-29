/**
 *  Created by daiwenjuan on 17/10/10 下午4:44.
 */
const merge = require('webpack-merge')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const common = require('./webpack.common.js')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
//common.output.publicPath = './build/'

let clientConfig = merge(common, {
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({  //根据打包动态生成的文件创建html文件
      title: 'manager',
      template: './views/temp.html',
      filename: '../../views/pro/index.html',
      inject: true,    //允许插件修改哪些内容，包括head与body
      hash: true,    //为静态资源生成hash值
      minify: {    //压缩HTML文件
        removeComments: true,    //移除HTML中的注释
        collapseWhitespace: false    //删除空白符与换行符
      }
    }),
    new ExtractTextPlugin({
      filename: 'styles.css'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      comments: false,
      ie8: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
})
function getExternals() {
  return fs.readdirSync(path.resolve(__dirname, './node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`

      return externals
    }, {})
}
let serverConfig = {
  context: path.resolve(__dirname),
  entry: {
    server: './servers/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist/server'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js'
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      }, {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader?modules', 'less-loader']
      },
      {
        test: /\.json$/,
        use: 'json'
      }
    ]
  },
  externals: getExternals(),
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.join(__dirname)
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })
  ]
}

module.exports = [clientConfig, serverConfig]