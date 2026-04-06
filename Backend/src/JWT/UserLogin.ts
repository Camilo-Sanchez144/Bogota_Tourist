import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../users/user.entity'
export class UserLogin{
    async userLogin(req:Request, res:Response){
        try{
            
        }catch(err:any){
            res.status(500).send(err.message)
        }
    }
}