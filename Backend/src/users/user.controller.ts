import { Request, Response } from 'express';
import { User } from './user.entity'
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UserDto } from './user.dto';
class UserController{
    async consultar(req: Request, res: Response){
        try{
            const data = await User.find()
            res.status(200).send(data)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    async AgregarUsuario(req:Request, res:Response){
        const dto = plainToInstance( UserDto, req.body )
        const errors = await validate(dto)
        if(errors.length > 0){
            res.status(400).json({mensaje:'Error en la validación', errors})
        }
        const registroUser= new User()
    }
}
export default new UserController();