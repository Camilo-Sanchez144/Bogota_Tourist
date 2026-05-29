import express from 'express'
import userController from './User.controller';
import { authMiddleware } from '../Middleware/userAuthentication';
//Middleware
const router = express.Router();

router.get('/', authMiddleware, userController.getUser)
router.post('/', userController.createUser)
router.route('/userDetail')
    .get(authMiddleware, userController.getUserById)
    .put(authMiddleware, userController.updateUser)
    .patch(authMiddleware, userController.patchUser)
    .delete(authMiddleware, userController.deleteUser)
export default router