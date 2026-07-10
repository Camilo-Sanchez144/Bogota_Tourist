import { Request, Response } from 'express'
import { PlaceService } from './Place.service'

const placeService = new PlaceService()

export class PlaceController {

    async create(req: Request, res: Response) {
        try {
            const userId = req.user.id
            const place = await placeService.createPlace(userId, req.body)
            return res.status(201).json(place)
        } catch (err: any) {
            return res.status(400).json({ message: err.message })
        }
    }

    async getMine(req: Request, res: Response) {
        try {
            const userId = req.user.id
            const places = await placeService.getPlacesByUser(userId)
            return res.status(200).json(places)
        } catch (err: any) {
            return res.status(404).json({ message: err.message })
        }
    }

    async edit(req: Request, res: Response) {
        try {
            const userId = req.user.id
            const placeId = Number(req.params.id)
            const place = await placeService.editPlace(userId, placeId, req.body)
            return res.status(200).json(place)
        } catch (err: any) {
            return res.status(400).json({ message: err.message })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userId = req.user.id
            const placeId = Number(req.params.id)
            const result = await placeService.deletePlace(userId, placeId)
            return res.status(200).json(result)
        } catch (err: any) {
            return res.status(400).json({ message: err.message })
        }
    }
}