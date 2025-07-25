const cloudinary = require('cloudinary').v2;
const fs = require('fs');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadoncloundinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error('No file path provided');
    
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    return response;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error.message);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw error;
  }
};

module.exports = { uploadoncloundinary };
