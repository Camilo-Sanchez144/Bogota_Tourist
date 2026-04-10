import { Request, Response } from 'express';
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UserDto } from './User.dto';
import { UserService } from './User.service'
class UserController{

    async ConsultarUsuario(req: Request, res: Response){
        try{
            const service = new UserService()
            const data = await service.ConsultarUsuarios()
            res.status(200).send(data)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    async ConsultarUsuarioDetalle(req:Request, res:Response){
        try{
            const id = req.params.id
            const service = new UserService()
            const data = await service.ConsultarUsuarioDetalle(id)
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
            const userRegistro = await service.AgregarUsuario(dto)
            res.status(201).json(userRegistro)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);               
        }
    }
    async ActualizarUsuario(req:Request, res:Response){
        try{
            const service = new UserService()
            const id = req.params.id
            const dto = plainToInstance( UserDto, req.body )
            const errors = await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const registro = await service.ActualizarUsuario(id, dto)
            res.status(201).json(registro)
        }catch(err){
            if(err instanceof Error)
            res.status(400).send(err.message)
        }
    }
    async BorrarUsuario(req:Request, res:Response){
        try{
            const id = req.params.id
            const service = new UserService()

            const usuarioBorrado = await service.BorrarUsuario(id)
            return res.status(204).send()
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message)
        }
    }
}
export default new UserController();