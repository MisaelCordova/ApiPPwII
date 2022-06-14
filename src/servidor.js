require('dotenv').config();
const express = require('express')
const app = express()
const routes = require('./api/routes')
const PORT = process.env.PORT
app.use('/api', routes)

app.use(function(err, req, res, next){
    res.status(500).json({
        erro: err.message
    })  
})

app.listen(PORT,function(){
    console.log("lendo",PORT)
})    