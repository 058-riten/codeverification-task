const express = require('express')
const { codeGenerator } = require('../controllers/codecontroller')
const router = express.Router()

router.get('/codegeneration', codeGenerator)

module.exports = router