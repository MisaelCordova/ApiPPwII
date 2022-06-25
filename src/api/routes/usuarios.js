const express = require('express')
const router = express.Router()
const Funko = require('../models/Funkos')
const Usuario = require('../models/Usuarios')

router.post('/login',async(req,res)=>{
    if(!req.body.user ||!req.body.senha){
        res.status(400).json({
            message:
            'user e senha obrigatórios'
        })
    }
    const usuario = await Usuario.findOne({ user: req.body.user }).exec()
    console.log(usuario)
    if(!usuario){
        return res.sendStatus(401);
    }
    
})
// Retornar todos os personagens
router.get('/', async (req, res) =>{
    const usuario = await Usuario.find().populate('funkos')
    res.json(usuario)
})

// Retornar um usuario especifico
router.get('/:id', async (req, res, next) => {
    try{
        const id = req.params.id
        var usuario = await Usuario.findById(id).populate('funkos')
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
    const funko = await Funko.find({ usuario: id});
    if(funko.length===0){
        const usuario = await Usuario.findByIdAndRemove(id)
        res.json(usuario)
    }else{
        return res.status(409).json({
            message:
            "Requisição invalida. Para o usuario ser excluído não pode ter nenhum funko cadastrado "
        })
    }
    
})

module.exports = router