const express = require('express')
const { codeVerification } = require('../controllers/codecontroller')
const router = express.Router()

router.post('/verifycode', codeVerification)

module.exports = router