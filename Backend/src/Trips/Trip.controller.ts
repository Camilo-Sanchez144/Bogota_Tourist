import { Request, Response } from 'express';
import { TripService } from './Trip.service';
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { TripDto } from './Trip.dto';
import { TripUpdateDto } from './TripUpdateDto';
class TripController{
    private tripService = new TripService()

    getTripsByUser = async (req:Request, res:Response)=>{
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const getTrips = await this.tripService.getTripsByUser(userId)
            res.status(200).send(getTrips)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    createTrip = async (req: Request, res: Response) =>{
        try {
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const dto = plainToInstance(TripDto, req.body)
            const errors = await validate(dto)

            if (errors.length > 0) {
                return res.status(400).json({
                    message: 'Error en la validación',
                    errors
                })
            }
            const trip = await this.tripService.createTrip(userId, dto)

            res.status(201).json(trip)
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    }
    editTrip = async (req: Request, res: Response)=>{
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const tripId = Number(req.params.tripId)
            if(isNaN(tripId)) {
                return res.status(400).send('tripId inválido')
            }
            const dto = plainToInstance(TripUpdateDto, req.body)
            const errors = await validate(dto)

            if (errors.length > 0) {
                return res.status(400).json({
                    message: 'Error en la validación',
                    errors
                })
            }
            const trip = await this.tripService.editTrip(userId, dto, tripId)

            res.status(200).json(trip)
        }catch(err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    } 
    deleteTrip= async (req: Request, res: Response)=>{
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const tripId = Number(req.params.tripId)
            if(isNaN(tripId)) {
                return res.status(400).send('tripId inválido')
            }
            const trip = await this.tripService.deleteTrip(tripId,userId)
            res.status(200).json({
                message: 'Trip eliminado correctamente',
                data: trip
            })
        }catch(err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    }
    deleteTripDay = async(req: Request, res: Response)=>{
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const tripId = Number(req.params.tripId)
            if(isNaN(tripId)) {
                return res.status(400).send('tripId inválido')
            }
            const dayNumber = Number(req.params.dayNumber)
            if(isNaN(dayNumber)) {
                return res.status(400).send('dayId inválido')
            }
            const trip = await this.tripService.deleteTripDay(tripId,dayNumber,userId)
            res.status(200).json({
                message: 'Trip Day eliminada correctamente',
                data: trip
            })
        }catch(err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    }
    deleteTripPlace = async (req: Request, res: Response)=>{
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const tripPlaceId = Number(req.params.tripPlaceId)
            if(isNaN(tripPlaceId)) {
                return res.status(400).send('tripId inválido')
            }
            const dayNumber = Number(req.params.dayNumber)
            if(isNaN(dayNumber)) {
                return res.status(400).send('dayId inválido')
            }
            const trip = await this.tripService.deleteTripPlace(userId,tripPlaceId,dayNumber)
            res.status(200).json({
                message: 'Trip place eliminado correctamente',
                data: trip
            })
        }catch(err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    }
}
export default new TripController();