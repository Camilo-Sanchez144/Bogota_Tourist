import { Request, Response } from 'express';
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UserDto } from './User.dto';
import { UserService } from './User.service'
import { UpdateUserDto } from './UpdateUser.dto'
class UserController{

    async ConsultarUsuario(req: Request, res: Response){
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
    async ConsultarUsuarioDetalle(req:Request, res:Response){
        try{
            const userId = Number(req.params.id)
            if (isNaN(userId)) {
            throw new Error('ID inválido')
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
    async AgregarUsuario(req:Request, res:Response){
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
    async ActualizarUsuario(req:Request, res:Response){
        try{
            const service = new UserService()
            const userId = Number(req.params.id)
            if (isNaN(userId)) {
                throw new Error('ID inválido')
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
    async ActualizarUserParcial(req:Request, res:Response){
        try{
            const service = new UserService()
            const userId = Number(req.params.id)
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
    async BorrarUsuario(req:Request, res:Response){
        try{
            const userId = Number(req.params.id)
            const service = new UserService()

            const usuarioBorrado = await service.deleteUser(userId)
            return res.status(204).send()
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message)
        }
    }
}
export default new UserController();