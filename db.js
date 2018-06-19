/**
 *  Created by daiwenjuan on 2018/6/14 下午3:51.
 */
let mysql = require('mysql')
function test() {
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'daiwenjuan',
    database: 'mysql'
  })
  connection.connect()
  let sql = 'INSERT INTO test(name,age) VALUES(?,?)'
  let addSQL = ['张三', '23']
  connection.query(sql, addSQL, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      return
    }
    console.log('--------------------------SELECT----------------------------')
    console.log(result)
    console.log('------------------------------------------------------------\n\n')
  })
  connection.end()
}
// test()

function queryData() {
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'daiwenjuan',
    database: 'mysql'
  })
  connection.connect()
  let sql = 'SELECT * FROM test'
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      return
    }
    console.log('--------------------------SELECT----------------------------')
    console.log(result)
    console.log('------------------------------------------------------------\n\n')
  })
  connection.end()
}
queryData()