const cloudinary = require('cloudinary').v2
const path = require('path')
const fs = require('fs')

const uploadImage = async (req, res) => {
  const response = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      use_filename: true,
      folder: 'proof',
  })
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(200).json({image: {src: response.secure_url}})
}

module.exports = uploadImage;