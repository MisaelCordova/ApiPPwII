const mongoose = require('../data')

var userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required:true,
    },
    senha:{
        type:String,
        required:true,
    },
     
    funkos:{
        type:Array,
        descricao:{
            type:String,
            required:true,
        },
        valor: {
            type: Number,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }, 
        sale:{
            type:Boolean,
            required:true
        }
    }
}, 
)

var Usuario = mongoose.model('Usuario', userSchema)
module.exports = Usuario