// External Dependencies
const createError = require('http-errors')
const bcrypt = require('bcrypt')

// Internal Dependencies
const People = require('../models/userModel')
const jwtTokenGenerator = require('../utilities/jwtTokenGenerator')

/**
 * @description Signup new user && Signin with auth
 * @route POST /api/user/signup
 * @access Public
 */
const userSignup = async (req, res, next) => {
  try {
    let newUser
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // Make Complete User Object
    if (req.files && req.files.length > 0) {
      newUser = new People({
        ...req.body,
        avatar: req.files[0].filename,
        password: hashedPassword,
      })
    } else {
      newUser = new People({
        ...req.body,
        avatar: 'demoavatar.png',
        password: hashedPassword,
      })
    }
    const result = await newUser.save()
    res.status(200).json(result)
  } catch (error) {
    next(createError(500, 'Registration Failed!'))
  }
}

/**
 * @description Signin a user with auth token.
 * @route POST /api/user/signin
 * @access Public
 */
const userSignin = async (req, res, next) => {
  const { mobile, password } = req.body
  try {
    const user = await People.findOne({ mobile })
    const passwordIsMatched = await bcrypt.compare(password, user.password)
    if (user && passwordIsMatched) {
      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        avatar: user.avatar,
        role: user.role,
      }
      // Generate Auth Token
      const token = jwtTokenGenerator(userData)

      // Set Cookie:
      res.cookie(process.env.COOKIE_NAME, token, {
        maxAge: process.env.JWT_EXPIRY,
        httpOnly: true,
        signed: true,
      })

      res.status(200).json({ ...userData, token })
    } else {
      next(createError(401, 'Authentication Failed!'))
    }
  } catch (error) {
    next(createError(401, 'Authentication Failed!'))
  }
}

/**
 * @description Retrun Logged in user profile.
 * @route GET /api/user/profile
 * @access Protected
 */

const userProfile = async (req, res, next) => {
  try {
    res.status(200).json({ ...req.user })
  } catch (error) {
    next(createError(500, 'Server Error!'))
  }
}

/**
 * @description Return All users.
 * @route GET /api/user
 * @access Protected (Admin Only)
 */

const allUser = async (req, res, next) => {
  try {
    const users = await People.find()
    res.status(200).json(users)
  } catch (error) {
    next(createError(500, 'Server Error!'))
  }
}

// Module Exports
module.exports = { userSignup, userSignin, allUser, userProfile }
