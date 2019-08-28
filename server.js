var express = require('express')
var app = express()
var path = require('path')

app.use(express.static(path.join(__dirname, '/client/public/')))

app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/client/public/index.html'), (err) => {
        if (err) {
          res.status(500).send(err)
        }
      })
})

app.listen(3000, ()=>{
    console.log('now listening on 3000')
})
