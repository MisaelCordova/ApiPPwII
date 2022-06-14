const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true})

mongoose.connection.on('connected', function(){
    console.log("Conexão com o MongoDB realizada com sucesso")
})

mongoose.connection.on('disconnected', function(){
    console.log("Desconectado do banco...")
})

module.exports = mongoose