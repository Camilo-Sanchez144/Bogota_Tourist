import { Request, Response } from 'express';
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UserDto } from './User.dto';
import { UserService } from './User.service'
import { UpdateUserDto } from './UpdateUser.dto'
class UserController{

    async getUser(req: Request, res: Response){
        try{
            const service = new UserService()
            const data = await service.getUsers()
            res.status(200).send(data)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    async getUserById(req:Request, res:Response){
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const service = new UserService()
            const data = await service.getUserById(userId)
            if(data.status===0){
                return res.status(403).json({mensaje:'El usuario está desactivado'})
            }
            res.status(200).send(data)
        }catch(err){
            if(err instanceof Error)
                res.status(500).send(err.message)
        }
    }
    async createUser(req:Request, res:Response){
        try{
            const service = new UserService()
            const dto = plainToInstance( UserDto, req.body )
            const errors = await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const userRegistro = await service.createUser(dto)
            res.status(201).json(userRegistro)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);               
        }
    }
    async updateUser(req:Request, res:Response){
        try{
            const service = new UserService()
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const dto = plainToInstance( UserDto, req.body )
            const errors = await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const registro = await service.updateUser(userId, dto)
            res.status(201).json(registro)
        }catch(err){
            if(err instanceof Error)
            res.status(400).send(err.message)
        }
    }
    async patchUser(req:Request, res:Response){
        try{
            const service = new UserService()
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const dto = plainToInstance( UpdateUserDto, req.body )
            const errors = await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const registro = await service.patchUser(userId, dto)
            res.status(200).json(registro)
        }catch(err){
            if(err instanceof Error)
            res.status(400).send(err.message)
        }
    }
    async deleteUser(req:Request, res:Response){
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const service = new UserService()

            const usuarioBorrado = await service.deleteUser(userId)
            return res.status(204).send(usuarioBorrado)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message)
        }
    }
}
export default new UserController();