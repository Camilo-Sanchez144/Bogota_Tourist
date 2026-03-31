import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Request, Response } from 'express';
import  user  from './users/user.routes'


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/user', user)

app.get('/', (req:Request, res:Response) => {
    res.send('Hola mundo');
});


export default app;