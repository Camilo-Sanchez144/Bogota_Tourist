// cloudinary.middleware.ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: 'dupfupuhy',
  api_key: '989644146128853',
  api_secret: 'Obko6EDcqHkvODWdY-jigNmQ0Hw'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'posts',         
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, crop: 'limit' }] 
  })
});

export const upload = multer({ storage });
export { cloudinary };