/**
 *  Created by daiwenjuan on 2018/6/10 16:43.
 */
var fs = require('fs')
exports.get_search_data = function (key, start, end) {
  return function (cb) {
    var http = require('http')
    var qs = require('querystring')
    var data = {
      key: key,
      start: start,
      end: end
    }
    var content = qs.stringify(data)
    var http_request = {
      hostname: '192.168.0.103',
      port: 80,
      path: '/listUsers?' + content,
      method: 'GET'
    }
    var req = http.request(http_request, function (response) {
      var body = ''
      response.setEncoding('uft-8')
      response.on('data', function (chunk) {
        body += chunk
      })
      response.on('end', function () {
        cb(null, body)
      })
    })
    req.end()
  }
}