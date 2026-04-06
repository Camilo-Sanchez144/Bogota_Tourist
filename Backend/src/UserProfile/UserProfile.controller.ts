import UserService from './UserProfile.service'
import {Request, Response} from 'express'
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
}
export default new UserProfileController()