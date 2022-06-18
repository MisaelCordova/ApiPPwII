const mongoose = require('../data')
const Schema = mongoose.Schema;
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
    funkos: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Funko'
        }
      ]
}, 
)

var Usuario = mongoose.model('Usuario', userSchema)
module.exports = Usuario