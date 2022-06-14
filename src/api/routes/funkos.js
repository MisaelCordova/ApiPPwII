const express = require('express')
const router = express.Router()
const data = require('../data')
const Usuario = require('../models/Usuarios')

//Retornar todos os funkos
router.get('/', async (req, res) =>{
    var nLimit = parseInt(req.query.limit) || 10 
    var nSkip = parseInt(req.query.skip)
    const usuario = await Usuario.find().limit(nLimit).skip(nSkip)
    let funkos = []
    usuario.map((item)=>{
        funkos.push(item.funkos)
    })
    res.json(funkos)
})

router.get('/:funko', async (req, res) =>{
    const funko = req.params.funko
    const busca = await Usuario.find({
        funkos: { $elemMatch: { descricao:funko} }     
    })
    busca.map((item)=>{
       let f = item.funkos
        let fucnFilter = (i)=>{
        return i.descricao === funko
     }
     res.json(f.filter(fucnFilter))
    })
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    console.log(req.body)
    if(!req.body.funko.descricao||!req.body.funko.valor||!req.body.funko.sale){
        return res.status(400).json({
            message:
              'Requisição inválida. Os campos descricao, valor e venda são obrigatórios!'
          });
    }
    const novoFunko = req.body
    const atualFunko= await Usuario.findByIdAndUpdate(id, novoFunko, {new: true})
    return res.json(atualFunko)
})


module.exports = router