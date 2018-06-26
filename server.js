/**
 *  Created by daiwenjuan on 2018/6/26 上午10:27.
 */
import Koa from 'koa'
import React from 'react'
import { renderToString } from 'react-dom/server'
import views from 'koa-views'
import path from 'path'
import Demo from './app/main'
const app = new Koa()
const webpack = require('webpack')
const config = require('./webpack.config')
const compiler = webpack(config)
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
app.use(devMiddleware(compiler))
app.use(hotMiddleware(compiler))

// 将/public文件夹设置为静态路径
app.use(require('koa-static')(__dirname + '/public'))
// 将ejs设置为我们的模板引擎
app.use(views(path.resolve(__dirname, './views'), { map: { html: 'ejs' } }))
// response
app.use(async ctx => {
  let str = renderToString(<Demo />)
  await ctx.render('index', {
    root: str
  })
})

app.listen(3000)
console.log('端口号：3000')