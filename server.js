var express = require('express')
var app = express()
var path = require('path')

app.use(express.static(path.join(__dirname, '/client/public')))

app.use('/', (req, res)=>{
    res.end()
})

app.listen(3000, ()=>{
    console.log('now listening on 3000')
})
