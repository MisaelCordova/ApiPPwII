const mongoose = require('../data')
const Schema = mongoose.Schema;
var funkoSchema = new mongoose.Schema({
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
    }, 
    sale:{
        type:Boolean,
        required:true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
      }
})
var Funko = mongoose.model('Funko', funkoSchema)
module.exports = Funko 