import { v2 as cloudinary } from 'cloudinary';
const {CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET } = process.env

 cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export default cloudinary

