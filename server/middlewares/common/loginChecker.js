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
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } else {
    next(createError(401, 'Access Denied!'))
  }
}

module.exports = loginChecker
