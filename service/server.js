/**
 *  Created by daiwenjuan on 2018/6/25 上午10:40.
 */
const Koa = require('koa')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const views = require('koa-views')
const path = require('path')
const Demo = require('../app/main')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const webpack = require('webpack')
const hotMiddleware = require('koa-webpack-hot-middleware')
const devMiddleware = require('koa-webpack-dev-middleware')
const fs = require('fs')
// const config = require('../webpack.config')
// const compiler = webpack(config)
// compiler.plugin('emit', (compilation, callback) => {
//   const assets = compilation.assets
//   let file, data
//
//   Object.keys(assets).forEach(key => {
//     if (key.match(/\.html$/)) {
//       file = path.resolve(__dirname, key)
//       data = assets[key].source()
//       fs.writeFileSync(file, data)
//     }
//   })
//   callback()
// })
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(path.resolve(__dirname, '../views'), { map: { html: 'ejs' } }))

// router.get('/', async ctx => {
//   let str = ReactDOMServer.renderToString(<Demo/>)
//   await ctx.render('index', {
//     root: str
//   })
// })
//
// app.use(router.routes())
// app.use(router.allowedMethods())

// app.use(devMiddleware(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }))
// app.use(hotMiddleware(compiler))
app.use((ctx) => {
  ctx.body = ReactDOMServer.renderToString(<Demo/>)
})
app.listen(3000)
console.log('listening 3100 ...')