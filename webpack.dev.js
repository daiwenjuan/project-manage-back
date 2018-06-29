/**
 *  Created by daiwenjuan on 17/10/10 下午4:43.
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const common = require('./webpack.common.js')
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, './dist/client'),
    historyApiFallback: true,
    inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
  },
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin(['./dist/client']),//清除打包的文件
    new HtmlWebpackPlugin({  //根据打包动态生成的文件创建html文件
      title: 'manager',
      template: './views/temp.html',
      filename: '../views/dev/index.html',
      inject: true,    //允许插件修改哪些内容，包括head与body
      hash: true,    //为静态资源生成hash值
      minify: {    //压缩HTML文件
        removeComments: true,    //移除HTML中的注释
        collapseWhitespace: false    //删除空白符与换行符
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin({ summary: false })
  ]
})