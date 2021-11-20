// External Dependencies
const createError = require('http-errors')
const multer = require('multer')
const path = require('path')

const singleImageUploader = (
  subFolderPath,
  allowedFileFormat,
  maxFileSize,
  errorMessage
) => {
  const uploadPath = `${__dirname}/../public/uploads/${subFolderPath}`

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname)
      const fileName =
        file.originalname.replace(fileExtension, '').split(' ').join('_') +
        '_' +
        Date.now() +
        fileExtension
      cb(null, fileName)
    },
  })

  const upload = multer({
    storage: storage,
    limits: { fileSize: maxFileSize },
    fileFilter: (req, file, cb) => {
      if (allowedFileFormat.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(createError(500, errorMessage))
      }
    },
  })

  return upload
}

module.exports = singleImageUploader
