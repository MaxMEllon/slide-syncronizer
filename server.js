const path = require('path')
const http = require('http')
const fs = require('fs')

const filepath = path.join(__dirname, './dist', 'index.html')
const stat = fs.statSync(filepath)
const html = fs
  .readFileSync(filepath)
  .toString()

console.log(html)

const port = 3000 + parseInt(process.env.NODE_APP_INSTANCE || 0)

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': stat.size,
      'Cache-Control': 'public, max-age=6000',
    })
    // res.write(html)
    res.end(html)
  })
  .listen(port, () => {
    console.log(`listening on *:${port}`)
  })
