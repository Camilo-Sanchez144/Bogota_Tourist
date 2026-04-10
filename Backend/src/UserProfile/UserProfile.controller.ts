import UserService from './UserProfile.service'
import {Request, Response} from 'express'
import {validate} from 'class-validator'
import { plainToInstance } from 'class-transformer'
import {UserProfileDto} from './UserProfile.dto'
class UserProfileController{
    async ConsultarUsuario(req:Request, res:Response){
        try{
            const id = req.params.userId
            const service = new UserService()
            const data = await service.ConsultarUsuario(id)
            res.status(200).send(data)
        }catch(err){
            if(err instanceof Error)
                res.status(500).send(err.message)
        }
    }
    async AgregarUsuario(req:Request, res:Response){
        try{
            const data = req.body
            const id= req.params.userId;
            const service = new UserService()
            const dto = plainToInstance(UserProfileDto,data)
            const errors = await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const registro = await service.AgregarUsuario(data,id)
            res.status(201).json(registro)
        }catch(err){
            if(err instanceof Error)
                res.status(500).send(err.message)
        }
    }
    async ActualizarUsuario(req:Request, res:Response){
        try{
            const service = new UserService()
            const id = req.params.userId
            const dto = plainToInstance( UserProfileDto, req.body )
            const errors = await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const registro = await service.ActualizarUsuario(id, dto)
            res.status(200).json(registro)
        }catch(err){
            if(err instanceof Error)
            res.status(400).send(err.message)
        }
    }
    async BorrarUsuario(req:Request, res:Response){
        try{
            const id = req.params.userId
            const service = new UserService()

            await service.BorrarUsuario(id)
            return res.status(204).send()
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message)
        }
    }
}
export default new UserProfileController()