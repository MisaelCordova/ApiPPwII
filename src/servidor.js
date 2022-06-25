require('dotenv').config();
const express = require('express')
const app = express()
const routes = require('./api/routes')
const PORT = process.env.PORT

const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
  };  
app.use(cors(corsOptions));
app.use('/api', routes)
app.use(function(err, req, res, next){
    res.status(500).json({
        erro: err.message
    })  
})

app.listen(PORT,function(){
    console.log("lendo",PORT)
})    