// External Dependencies
const createError = require('http-errors')
const jwt = require('jsonwebtoken')

// Function will Check headers authorization Bearer token
const loginChecker = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          next(createError(401, 'Unauthorized request!'))
        } else {
          req.user = decoded
          next()
        }
      })
    } else {
      next(createError(401, 'Unauthorized request!'))
    }
  } else {
    next(createError(401, 'Unauthorized request!'))
  }
}

module.exports = loginChecker
