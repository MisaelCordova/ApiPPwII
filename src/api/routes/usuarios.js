const express = require('express')
const router = express.Router()
const Usuario = require('../models/Usuarios')

// Retornar todos os personagens
router.get('/', async (req, res) =>{
    var nLimit = parseInt(req.query.limit) || 10 
    var nSkip = parseInt(req.query.skip)
    const usuario = await Usuario.find().limit(nLimit).skip(nSkip)
    res.json(usuario)
})

// Retornar um usuario especifico
router.get('/:id', async (req, res, next) => {
    try{
        const id = req.params.id
        var usuario = await Usuario.findById(id)
        if(!usuario) return res.status(404).json({
            "erro": "Usuário não encontrado"
        })
        res.json(usuario)
    } catch(err){
        next(err)
    }
})

// Inserir um novo usuario
router.post('/', async (req, res) => {
    if(!req.body.nome||!req.body.user||!req.body.senha){
        return res.status(400).json({
            message:
              'Requisição inválida. Os campos nome, user, senha são obrigatórios!'
          });
    }
    const checkDuplicate = await Usuario.find({
        $or: [{ nome: req.body.nome },{ user: req.body.user }, ]
    })
    if(checkDuplicate.length!==0){
        return res.sendStatus(409)
    }
    const usuario = new Usuario(req.body)
    var resultado = await usuario.save()
    return res.json(usuario)
})

// Substituir um usuario
router.put('/:id', async (req, res) => {
    const id = req.params.id
    if(!req.body.nome||!req.body.user||!req.body.senha){
        return res.status(400).json({
            message:
              'Requisição inválida. Os campos nome, user, senha são obrigatórios!'
          });
    }
    const novoUsuario = req.body
    const atualUsuario = await Usuario.findByIdAndUpdate(id, novoUsuario, {new: true})
    return res.json(atualUsuario)
})

// Deletar um usuario
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const usuario = await Usuario.findByIdAndDelete(id)
    res.json(usuario)
})

module.exports = router