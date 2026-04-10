import express from 'express'

import UserProfileController from './UserProfile.controller';
//Middleware
const router = express.Router();

router.get('/:userId/profile', UserProfileController.ConsultarUsuario)
router.post('/:userId/profile', UserProfileController.AgregarUsuario)
router.put('/:userId/profile', UserProfileController.ActualizarUsuario)
router.delete('/:userId/profile', UserProfileController.BorrarUsuario)

export default router