import { Request, Response } from "express"
import { EventParticipantService } from "./EventParticipant.service"
class EventParticipant{
    private eventParticipantService = new EventParticipantService()
    joinEvent = async(req:Request, res:Response)=>{
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const eventId = Number(req.params.eventId)
            if(isNaN(eventId)){
                res.status(400).send('event debe ser un numero')
                return;
            }
            const newRelationEvent = await this.eventParticipantService.joinEvent(userId, eventId)
            res.status(201).send(newRelationEvent)
        }catch(err){
        if(err instanceof Error){
            res.status(500).send(err.message)
        }
    }
    }
    leaveEvent = async(req:Request, res:Response)=>{
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const eventId = Number(req.params.eventId)
            if(isNaN(eventId)){
                res.status(400).send('event debe ser un numero')
                return;
            }
            const deleteRelationEvent = await this.eventParticipantService.leaveEvent(userId, eventId)
            res.status(200).send(deleteRelationEvent)  
        }catch(err){
        if(err instanceof Error){
            res.status(500).send(err.message)
        }
    }
    }
}
export default new EventParticipant()