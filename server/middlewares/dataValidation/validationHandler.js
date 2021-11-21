// External Dependencies:
const { validationResult } = require('express-validator')
const path = require('path')
const { unlink } = require('fs')

// Custom Data Validation Handler:
const validationHandler = (req, res, next) => {
  const errors = validationResult(req)
  const formattedErrors = errors.mapped()
  if (Object.keys(formattedErrors).length > 0) {
    if (req.files.length > 0) {
      const filePath = path.join(
        __dirname,
        '../../public/uploads/avatars/',
        req.files[0].filename
      )

      unlink(filePath, (err) => {
        if (err) {
          console.log(err)
        }
      })
    }
    res.status(500).json({ errors: formattedErrors })
  } else {
    next()
  }
}

module.exports = { validationHandler }
