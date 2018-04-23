const path = require('path')
const http = require('http')
const fs = require('fs')

const filepath = path.join(__dirname, './dist', 'index.html')
const stat = fs.statSync(filepath)
const html = fs.readFileSync(filepath)

http
  .createServer((req, res) => {
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': stat.size,
      'Cache-Control': 'public, max-age=6000',
    })
    response.write(html)
    response.end
  })
  .listen(3000)
