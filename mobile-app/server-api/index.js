const moment = require('moment')
const express = require('express')
const history = require('connect-history-api-fallback')

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

app.use(history())

app.listen(port, function(err) {
  if (err) {
    console.error("Error starting server:\n", err.stack)
    process.exit(1)
  }
  console.log('API available at port '+ port);
})
