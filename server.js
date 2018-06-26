/**
 *  Created by daiwenjuan on 2018/6/26 上午10:27.
 */
const Koa = require('koa')
const Router = require('koa-router')
const React = require('react')
import { renderToString } from 'react-dom/server'
const views = require('koa-views')
const path = require('path')
import Demo from './app/main'
const fs = require('fs')
const app = new Koa()
const router = new Router()
const webpack = require('webpack')
const config = require('./webpack.config')
const compiler = webpack(config)
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
compiler.plugin('emit', (compilation, callback) => {
  const assets = compilation.assets
  let file, data
  Object.keys(assets).forEach(key => {
    if (key.match(/\.html$/)) {
      file = path.resolve(__dirname, key)
      data = assets[key].source()
      fs.writeFileSync(file, data)
    }
  })
  callback()
})
app.use(devMiddleware(compiler))
app.use(hotMiddleware(compiler))

// 将/public文件夹设置为静态路径
app.use(require('koa-static')(__dirname + '/public'))
// 将ejs设置为我们的模板引擎
app.use(views(path.resolve(__dirname, './views'), { map: { html: 'ejs' } }))
// response
router.get('*', async (ctx) => {
  let str = renderToString(<Demo />)
  await ctx.render('index', {
    root: str
  })
})
// app.use(async ctx => {
//   let str = renderToString(<Demo />)
//   await ctx.render('index', {
//     root: str
//   })
// })
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
console.log('端口号：3000')