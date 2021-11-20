const jwt = require('jsonwebtoken')

const jwtTokenGenerator = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  })
}

module.exports = jwtTokenGenerator
