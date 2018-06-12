/**
 *  Created by daiwenjuan on 2018/6/10 16:28.
 */
const koa = require('koa')
const router = require('koa-router')()
const app = new koa()
const multer = require('koa-multer')
const xlsx = require('xlsx')
let formidable = require('formidable')
let node_xlsx = require('node-xlsx')
let path = require('path')
let fs = require('fs')

router.get('/', async (ctx, next) => {
  ctx.body = `<form action="http://127.0.0.1:3000/upload" method="post" enctype="multipart/form-data">  
     <input type="file" name="file" value="选择文件"/>  
     <input  type="submit"  value="上传"/>  
</form>  `
})

let ExcelParse = function (newPath) {
  let obj = node_xlsx.parse(newPath)
  console.log(obj)
}

router.post('/upload', async (ctx, next) => {
  let form = new formidable.IncomingForm()
  form.encoding = 'utf-8'
  form.uploadDir = path.join(__dirname, '/public/uploads/')
  form.keepExtensions = true//保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024
  form.parse(ctx.req, function (err, fields, files) {
    if (err) {
      console.log('文件上传错误！')
      return
    }
    let filename = files.file.name

    // 对文件名进行处理，以应对上传同名文件的情况
    let nameArray = filename.split('.')
    let type = nameArray[nameArray.length - 1]
    let name = ''
    for (let i = 0; i < nameArray.length - 1; i++) {
      name = name + nameArray[i]
    }

    let date = new Date()
    let time = '_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDay() + '_' + date.getHours() + '_' +
               date.getMinutes()

    let avatarName = name + time + '.' + type

    let newPath = form.uploadDir + avatarName
    console.log(newPath)
    fs.renameSync(files.file.path, newPath)  //重命名
    console.log('重命名成功！')
    ExcelParse(newPath)
  })
  ctx.body = '上传成功'
})

app.use(router.routes())
app.listen(3000, () => {
  console.log('starting at port 3000')
})