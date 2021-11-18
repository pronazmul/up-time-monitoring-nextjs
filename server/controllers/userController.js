// External Dependencies

// Internal Dependencies

/**
 * @description This is provides all user.
 * @route GET /api/user
 * @access Public
 */

const allUser = (req, res, next) => {
  res.status(200).json({ name: 'Nazmul Huda' })
}

// Module Exports
module.exports = { allUser }
