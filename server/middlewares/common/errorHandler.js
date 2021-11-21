// External Dependencies
const createError = require('http-errors')

// Routing URL not Found Handler
const notFoundHandler = (req, res, next) => {
  next(createError(404, `Requested Path Not Found - ${req.originalUrl}`))
}

// Custom Error Handler
const errorHandler = (error, req, res, next) => {
  const errorMessage =
    process.env.NODE_ENV === 'production'
      ? { msg: error.message }
      : { msg: error.message, stack: error.stack }

  res.status(error.status || 500).json({
    errors: {
      common: errorMessage,
    },
  })
}

// Exprot Module
module.exports = { notFoundHandler, errorHandler }
