import express from 'express'
import UserLogin from './UserLogin';
//Middleware
const router = express.Router();

router.post('/',UserLogin.userLogin)

export default router