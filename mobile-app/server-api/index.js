const express = require('express')
const history = require('connect-history-api-fallback')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 80
app.get('/api/login/', function (req, res, next) {
  console.log("user login")
  setTimeout(()=>{
    res.json({
    "user":"guillermo"
    })
  },4000);
})

app.get('/api/logout/', function (req, res, next) {
  console.log("user logout")
  setTimeout(()=>{
    res.json({
    "user":"guillermo"
    })
  },4000);
})


app.get('/video', function(req, res) {
  const path = './static/videos/video.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});


app.use(history())

app.listen(port, function(err) {
  if (err) {
    console.error("Error starting server:\n", err.stack)
    process.exit(1)
  }
  console.log('API available at port '+ port);
})
