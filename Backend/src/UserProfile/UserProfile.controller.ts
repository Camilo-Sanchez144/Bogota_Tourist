import UserService from './UserProfile.service'
import {Request, Response} from 'express'
import validate from 'class-validator'
import { plainToInstance } from 'class-transformer'
import {UserProfileDto} from './UserProfile.dto'
class UserProfileController{
    async ConsultarUsuario(req:Request, res:Response){
        try{
            const id = req.params.userId
            const service = new UserService()
            const data = service.ConsultarUsuario(id)
            res.status(200).send(data)
        }catch(err){
            if(err instanceof Error)
                res.status(500).send(err.message)
        }
    }
    async AgregarUsuario(req:Request, res:Response){
        try{
            const data = req.body
            const service = new UserService()
            const dto = plainToInstance(UserProfileDto,data)
            const registro = service.
        }catch(err){
            if(err instanceof Error)
                res.status(500).send(err.message)
        }
    }
}
export default new UserProfileController()