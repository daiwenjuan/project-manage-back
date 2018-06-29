/**
 *  Created by daiwenjuan on 17/10/10 下午4:43.
 */
const path = require('path')
const webpack = require('webpack')


const nodeEnv = process.env.NODE_ENV || 'development'

module.exports = {
  context: path.resolve(__dirname),//这是entry配置项的根目录（绝对路径）
  entry: {
    main: [
      './app/index.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
    ]
  },
  output: {
    filename: '[name].[hash].js', //防止缓存
    path: path.resolve(__dirname, './dist/client'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname)
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|jpeg)$/,
        use: ['file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
      },
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader?modules', 'less-loader']
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [

    new webpack.HashedModuleIdsPlugin(),
    // 把一些公共的模块提取出来就行缓存，manifest在vendor的基础上把一些经常变动的在提取出来
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new webpack.DefinePlugin({
      // 定义全局变量
      'process.env': {
        'NODE_ENV': JSON.stringify(nodeEnv)
      }
    })
  ]
}