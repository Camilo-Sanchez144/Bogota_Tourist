import express from 'express'

import UserProfileController from './UserProfile.controller';
//Middleware
const router = express.Router();

router.get('/', UserProfileController.ConsultarUsuario)
router.post('/', UserProfileController.AgregarUsuario)

export default router