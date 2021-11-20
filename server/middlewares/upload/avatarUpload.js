const createError = require('http-errors')
const singleImageUploader = require('../../utilities/singleImageUploader')

const avatarUpload = (req, res, next) => {
  // Multer Upload Object
  const upload = singleImageUploader(
    'avatars',
    ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    1000000,
    'Unsupported Image format !'
  )

  //   Multar Upload Handler:
  upload.any()(req, res, (error) => {
    if (error) {
      next(createError(500, error.message))
    } else {
      next()
    }
  })
}

module.exports = avatarUpload
