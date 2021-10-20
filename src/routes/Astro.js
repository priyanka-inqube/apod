const express = require('express')
const router = express.Router()
const AstroController = require('../controllers/Astro')


router.get('/',AstroController.getData)

module.exports = router