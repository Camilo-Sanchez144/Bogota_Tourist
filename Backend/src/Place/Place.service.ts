import { Place } from './Place.entity'
import { TripPlace } from '../Trips/TripPlace.entity'
import User from '../User/User.entity'
import { Not } from 'typeorm'

export class PlaceService {

    async createPlace(userId: number, data: any) {
        const user = await User.findOne({ where: { id: userId, status: 1 } })
        if (!user) throw new Error('Usuario no existe')

        const place = new Place()
        place.owner = user
        place.name = user.first_name
        place.description = data.description
        place.address = data.address
        place.category = data.category

        await place.save()

        return place
    }

    async getPlacesByUser(userId: number) {
        const places = await Place.find({
            where: { owner: { id: userId } },
            order: { created_at: 'DESC' }
        })

        if (places.length === 0) {
            throw new Error('No se encontraron lugares')
        }

        return places
    }

    async editPlace(userId: number, placeId: number, data: any) {
        const place = await Place.findOne({
            where: { id: placeId, owner: { id: userId } }
        })

        if (!place) throw new Error('Place no existe o no te pertenece')

        place.name = data.name ?? place.name
        place.description = data.description ?? place.description
        place.address = data.address ?? place.address
        place.category = data.category ?? place.category

        await place.save()

        return place
    }

    async deletePlace(userId: number, placeId: number) {
        const place = await Place.findOne({
            where: { id: placeId, owner: { id: userId } }
        })

        if (!place) throw new Error('Place no existe o no te pertenece')

        const inUseByOthers = await TripPlace.findOne({
            where: {
                place: { id: placeId },
                trip_day: {
                    trips: {
                        user: { id: Not(userId) }
                    }
                }
            },
            relations: ['trip_day', 'trip_day.trips', 'trip_day.trips.user']
        })

        if (inUseByOthers) {
            throw new Error('Este lugar está en uso en itinerarios de otros usuarios y no puede eliminarse')
        }

        await place.remove()

        return { message: 'Lugar eliminado' }
    }
}