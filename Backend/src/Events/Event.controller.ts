import { Event } from './Event.entity';
import { Request, Response } from 'express';
import { EventService } from './Event.service';
import { plainToInstance } from 'class-transformer';
import { EventDto } from './Event.dto';
import { validate } from 'class-validator';
import { EventUpdateDto } from './EventUpdate.dto'
class EventController{
    private eventService = new EventService()
    getEvents = async(req:Request, res:Response)=>{
        try{
            const events  = await this.eventService.getEvents()
            res.status(200).send(events )
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    
    getEventsByUser = async(req:Request, res:Response) => {
        try{
            const userId = Number((req as any).user.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const events  = await this.eventService.getEventsByUser(userId)
            res.status(200).send(events)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    getEventById = async(req:Request, res:Response)=>{
        try{
            const eventId = Number(req.params.eventId)
            if(isNaN(eventId)) {
                res.status(400).send('event debe ser un numero')
                return;
            }
            const events  = await this.eventService.getEventById(eventId)
            res.status(200).send(events )
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    createEvent = async(req:Request, res:Response)=>{
        try{
            const userId = Number((req as any).user.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            if(isNaN(userId)) {
                res.status(400).send('user debe ser un numero')
                return;
            }
            const dto = plainToInstance(EventDto, req.body)
            const errors = await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({
                    message: 'Error en la validación',
                    errors
                })               
            }
            const newEvent = await this.eventService.createEvent(dto,userId)
            res.status(201).send(newEvent)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    } 
    editEvent = async(req:Request, res:Response)=>{
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const eventId = Number(req.params.eventId)
            if(isNaN(eventId)) {
                res.status(400).send('event debe ser un numero')
                return;
            }
            const dto = plainToInstance(EventUpdateDto, req.body)
            const errors = await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({
                    message: 'Error en la validación',
                    errors
                })               
            }
            const eventEdited = await this.eventService.editEvent(userId,eventId,dto)
            res.status(200).send(eventEdited)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    deleteEvent = async(req:Request, res:Response)=>{
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const eventId = Number(req.params.eventId)
            if(isNaN(eventId)) {
                res.status(400).send('event debe ser un numero')
                return;
            }
            const eventDeleted = await this.eventService.deleteEvent(eventId, userId)
            res.status(200).send(eventDeleted)           
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
}
export default new EventController()
