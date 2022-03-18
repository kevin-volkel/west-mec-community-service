const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadImage = async (req, res) => {
  try {
    const src = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      use_filename: true,
      folder: 'proof',
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(200).json({ src: src.secure_url });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Cloudinary Upload Error');
  }
}

module.exports = uploadImage;