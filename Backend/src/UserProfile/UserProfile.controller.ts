import UserService from './UserProfile.service'
import {Request, Response} from 'express'
import {validate} from 'class-validator'
import { plainToInstance } from 'class-transformer'
import {UserProfileDto} from './UserProfile.dto'
import { UpdateUserProfileDto } from './UpdateUserProfileDto'
class UserProfileController{
    async getProfileByUserId(req:Request, res:Response){
        try{
            const profileId = Number((req as any).user?.id)
            if (!profileId || Number.isNaN(profileId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const service = new UserService()
            const data = await service.getProfileByUserId(profileId)
            res.status(200).send(data)
        }catch(err){
            if(err instanceof Error)
                res.status(500).send(err.message)
        }
    }
/*     async createProfile(req:Request, res:Response){
        try{
            const service = new UserService()
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const dto = plainToInstance(UserProfileDto, req.body)
            const errors = await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const profile_picture = (req.file as any)?.secure_url ?? req.file?.path;
            const registro = await service.createProfile(userId,{...dto, profile_picture})
            res.status(201).json(registro)
        }catch(err){
            if(err instanceof Error)
                res.status(500).send(err.message)
        }
    } */
    async updateProfile(req:Request, res:Response){
        try{
            const service = new UserService()
            const profileId = Number((req as any).user?.id)
            if (!profileId || Number.isNaN(profileId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const dto = plainToInstance( UserProfileDto, req.body )
            const errors = await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const profile_picture = (req.file as any)?.secure_url ?? req.file?.path;
            const registro = await service.updateProfile(profileId, {...dto, profile_picture})
            res.status(200).json(registro)
        }catch(err){
            if(err instanceof Error)
            res.status(400).send(err.message)
        }
    }
    async patchProfile(req:Request, res:Response){
        try{
            const service = new UserService()
            const profileId = Number((req as any).user?.id)
            if (!profileId || Number.isNaN(profileId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const dto = plainToInstance( UpdateUserProfileDto, req.body )
            const errors = await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const profile_picture = (req.file as any)?.secure_url ?? req.file?.path;
            const registro = await service.patchProfile(profileId, {...dto, profile_picture})
            res.status(200).json(registro)
        }catch(err){
            if(err instanceof Error)
            res.status(400).send(err.message)
        }
    }
    async deleteProfile(req:Request, res:Response){
        try{
            const profileId = Number((req as any).user?.id)
            if (!profileId || Number.isNaN(profileId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const service = new UserService()

            await service.deleteProfile(profileId)
            return res.status(204).send()
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message)
        }
    }
}
export default new UserProfileController()