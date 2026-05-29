import express from 'express'
import { upload }  from '../Cloudinary/Cloudinary'
import UserProfileController from './UserProfile.controller';
import { authMiddleware } from '../Middleware/userAuthentication';

const router = express.Router();

router.get('/', authMiddleware, UserProfileController.getProfileByUserId)
//router.post('/',upload.single('profile_picture'), UserProfileController.createProfile)
router.put('/', authMiddleware, upload.single('profile_picture'),UserProfileController.updateProfile)
router.patch('/', authMiddleware, upload.single('profile_picture'), UserProfileController.patchProfile)
router.delete('/', authMiddleware, UserProfileController.deleteProfile)

export default router