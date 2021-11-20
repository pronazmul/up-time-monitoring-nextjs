// External Dependencies
const createError = require('http-errors')

// Function will Check headers authorization Bearer token
const roleChecker = (role) => (req, res, next) => {
  if (req.user.role && role.includes(req.user.role)) {
    next()
  } else {
    next(createError(401, 'Access Denied! Admin Only.'))
  }
}

module.exports = roleChecker
