// External Dependencies:
const { check } = require('express-validator')
const createError = require('http-errors')

// Internal Dependencies:
const People = require('../../models/userModel')

// validate registration form data
const userSignUpValidator = [
  check('name')
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must be alphabets only')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .trim()
    .custom(async (value) => {
      try {
        const user = await People.findOne({ email: value })
        if (user) {
          throw createError(400, 'Email is already exist!')
        }
      } catch (error) {
        throw createError(400, error.message)
      }
    }),
  check('mobile')
    .isMobilePhone('bn-BD', { strictMode: true })
    .withMessage('Please enter a valid mobile number')
    .custom(async (value) => {
      try {
        const user = await People.findOne({ mobile: value })
        if (user) {
          throw createError(400, 'Mobile number is already in use')
        }
      } catch (error) {
        throw createError(400, error.message)
      }
    }),
  check('password')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long, contain at least one number and one special character'
    ),
]

// validate registration form data
const userProfileUpdateValidator = [
  check('name')
    .optional()
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must be alphabets only')
    .trim(),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .trim(),
  check('mobile')
    .optional()
    .isMobilePhone('bn-BD', { strictMode: true })
    .withMessage('Please enter a valid mobile number'),
  check('password')
    .optional()
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long, contain at least one number and one special character'
    ),
]

module.exports = { userSignUpValidator, userProfileUpdateValidator }
