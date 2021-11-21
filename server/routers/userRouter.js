// External Dependencies
const express = require('express')
const router = express.Router()

// Internal Dependencies
const {
  allUser,
  userSignin,
  userProfile,
  userSignup,
  updateProfile,
  deleteUser,
} = require('../controllers/userController')
const loginChecker = require('../middlewares/auth/loginChecker')
const roleChecker = require('../middlewares/auth/roleChecker')
const {
  userSignUpValidator,
  userProfileUpdateValidator,
} = require('../middlewares/dataValidation/userValidator')
const {
  validationHandler,
} = require('../middlewares/dataValidation/validationHandler')
const avatarUpload = require('../middlewares/upload/avatarUpload')

// Public Routes
router
  .route('/signup')
  .post(avatarUpload, userSignUpValidator, validationHandler, userSignup)

// Public Routes
router.route('/signin').post(userSignin)

// Protected Route (Logged in user)
router.route('/profile').get(loginChecker, userProfile)

// Protected Route (Logged in user)
router
  .route('/profile/update')
  .put(
    loginChecker,
    avatarUpload,
    userProfileUpdateValidator,
    validationHandler,
    updateProfile
  )

//  Protected Route (Admin Only)
router.route('/').get(loginChecker, roleChecker('admin'), allUser)

//  Protected Route (Admin Only)
router
  .route('/delete/:id')
  .delete(loginChecker, roleChecker('admin'), deleteUser)

// Module Exports
module.exports = router
