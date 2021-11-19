// External Dependencies
const createError = require('http-errors')

// Internal Dependencies
const People = require('../models/userModel')

/**
 * @description This is provides all user.
 * @route GET /api/user
 * @access Public
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
module.exports = { allUser }
