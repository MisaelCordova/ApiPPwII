const express = require('express')
const router = express.Router()
const data = require('../data')
const Funko = require('../models/Funkos')
const Usuario = require('../models/Usuarios')

//Retornar todos os funkos
router.get('/', async (req, res, ) => {
    const funko = await Funko.find()
    res.json(funko)
})
router.get('/desc', async(req,res)=>{
    const funko = await Funko.find()
    funko.sort((a,b)=>{
        if(a.descricao.toUpperCase()>b.descricao.toUpperCase()){
            return 1
       }
       if(a.descricao.toUpperCase()<b.descricao.toUpperCase()){
            return -1
       }
       return 0 
    })
    res.json(funko)
})
router.get('/valor', async(req,res)=>{
    const funko = await Funko.find()
    funko.sort((a,b)=>{
        return a.valor - b.valor
    })
    res.json(funko)
})
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const funko = await Funko.findById(id)
        if (!funko) return res.status(404).json({
            "erro": "Funko não encontrado"
        })
        res.json(funko)
    } catch (err) {
        next(err)
    }
})
router.post('/:id', async (req, res) => {
    const id = req.params.id

    if (!req.body.descricao || !req.body.valor || req.body.sale === null) {
        return res.status(400).json({
            message:
                'Requisição inválida. Os campos descricao, valor e venda são obrigatórios!'
        });
    }
    req.body.usuario = id

    const resultado = await Funko.create({
        descricao: req.body.descricao,
        valor: req.body.valor,
        url: req.body.url,
        sale: req.body.sale,
        usuario: req.params.id
      });
    const usuario = await Usuario.findOneAndUpdate({_id: id}, { $push: { funkos: resultado._id } }, { new: true })
    return res.json(resultado)
})
router.put("/:id", async(req,res)=>{
    const id = req.params.id
    if(!req.body.descricao||!req.body.valor||req.body.sale === null){
        return res.status(400).json({
            message:
            'Requisição inválida. Os campos decricao, valor e sale são obrigatórios!'
        });
    }
    const novoFunko = req.body
    const atualFunko = await Funko.findByIdAndUpdate(id, novoFunko, {new:true})
    return res.json(atualFunko)
})
router.delete('/:id', async (req, res) => {

    const id = req.params.id
    const funko = await Funko.findByIdAndRemove(id);
    if (!funko) {
        return res
          .status(404)
          .json({ message: 'Nenhum Funko encontrado com esse ID!' });
      }
     
    res.json(funko)
})

module.exports = router