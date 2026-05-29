import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import  user  from './User/User.routes'
import  userProfile from './UserProfile/UserProfile.routes'
import UserLogin from './JWT/UserLogin.routes';
import Post from './Posts/Post.routes'
import  Comment  from './Comments/Comment.routes';
import  Like  from './Likes/Likes.routes';
import  Trip  from './Trips/Trip.routes';
import eventRoutes from './Events/Event.routes'
import eventParticipantRoutes from './EventParticipant/EventParticipant.routes'
import {authMiddleware} from './Middleware/userAuthentication'
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/userProfile', userProfile)
app.use('/user', user)
app.use('/login', UserLogin)
app.use('/posts', authMiddleware, Post)
app.use('/comments', authMiddleware, Comment)
app.use('/like', authMiddleware, Like)
app.use('/trip', authMiddleware, Trip)
app.use("/events", authMiddleware, eventRoutes);
app.use("/participants", authMiddleware,  eventParticipantRoutes);


export default app;