import express from 'express'
import UserController from './user.controller'
import userController from './user.controller';
//Middleware
const router = express.Router();

router.get('/', userController.consultar)
router.post('/')
export default router