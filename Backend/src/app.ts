import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Request, Response } from 'express';
import  user  from './User/User.routes'
import  userProfile from './UserProfile/UserProfile.routes'
import UserLogin from './JWT/UserLogin.routes';
import Post from './Posts/Post.routes'

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/user', user)
app.use('/user', userProfile)
app.use('/login', UserLogin)
app.use('/posts', Post)


export default app;