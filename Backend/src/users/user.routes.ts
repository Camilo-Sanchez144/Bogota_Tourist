import express from 'express'
import UserController from './user.controller'
import userController from './user.controller';
//Middleware
const router = express.Router();

router.get('/', userController.ConsultarUsuario)
router.post('/', userController.AgregarUsuario)
router.route('/:id')
    .get(userController.ConsultarUsuarioDetalle)
    .put(userController.ActualizarUsuario)
    .delete(userController.BorrarUsuario)
export default router