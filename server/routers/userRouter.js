// External Dependencies
const express = require('express')
const router = express.Router()

// Internal Dependencies
const {
  allUser,
  userSignin,
  userProfile,
  userSignup,
} = require('../controllers/userController')
const loginChecker = require('../middlewares/common/loginChecker')
const roleChecker = require('../middlewares/common/roleChecker')
const avatarUpload = require('../middlewares/upload/avatarUpload')

// Public Routes
router.route('/signup').post(avatarUpload, userSignup)

// Public Routes
router.route('/signin').post(userSignin)

// Protected Route (Logged in user)
router.route('/profile').get(loginChecker, userProfile)

//  Protected Route (Admin Only)
router.route('/').get(loginChecker, roleChecker('admin'), allUser)

// Module Exports
module.exports = router
