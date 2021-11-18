// External Dependencies
const express = require('express')
const router = express.Router()

// Internal Dependencies
const { allUser } = require('../controllers/userController')

// Routes
router.route('/').get(allUser)

// Module Exports
module.exports = router
