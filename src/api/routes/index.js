const express = require('express')
const router = express.Router()
const usuario = require('./usuarios')
const funkos = require('./funkos')

router.use(express.json())
router.use('/usuario', usuario)
router.use('/funkos',funkos)

module.exports = router;