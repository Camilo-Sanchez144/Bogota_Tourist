import { AppDataSource } from '../db/conexion'
import { Trip } from './Trip.entity'
import { TripDay } from './TripDay.entity'
import { TripPlace } from './TripPlace.entity'
import { Place } from '../Place/Place.entity'
import User from '../User/User.entity'

export class TripService {

    async getTripsByUser(userId:number){
        const getTrips = await Trip.find({where: {user:{id:userId}}})
        if(getTrips.length === 0){
            throw new Error('No se encontraron viajes activos')
        }
        return getTrips
    }
    async createTrip(userId: number, data: any) {
        const queryRunner = AppDataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const user = await User.findOne({ where: { id: userId } })

            if (!user) throw new Error('Usuario no existe')

            const trip = new Trip()
            trip.user = user
            trip.title = data.title
            trip.description = data.description
            trip.start_date = data.start_date
            trip.end_date = data.end_date
            trip.number_of_people = data.number_of_people
            trip.total_budget = data.total_budget

            await queryRunner.manager.save(trip)

            for (const dayData of data.days) {

                const day = new TripDay()
                day.trips = trip
                day.day_number = dayData.day_number
                day.notes = dayData.notes

                await queryRunner.manager.save(day)

                for (const placeData of dayData.places) {

                    const place = await Place.findOne({
                        where: { id: placeData.place_id }
                    })

                    if (!place) throw new Error('Place no existe')

                    const tripPlace = new TripPlace()
                    tripPlace.trip_day = day
                    tripPlace.place = place
                    tripPlace.visit_order = placeData.visit_order
                    tripPlace.planned_start = placeData.planned_start
                    tripPlace.estimated_cost = placeData.estimated_cost

                    await queryRunner.manager.save(tripPlace)
                }
            }

            await queryRunner.commitTransaction()

            return trip

        } catch (err) {
            await queryRunner.rollbackTransaction()
            throw err
        } finally {
            await queryRunner.release()
        }
    }
    async editTrip(userId:number, data:any, tripId:number){
        const queryRunner = AppDataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const user = await queryRunner.manager.findOne(User, {
                where: { id: userId }
            })
            if (!user) throw new Error('Usuario no existe')
            const trip = await queryRunner.manager.findOne(Trip, {
                where: { id: tripId, user: { id: userId } },
                relations: ['user', 'days', 'days.places']
            })
            if(!trip){
                throw new Error ('El trip no pertenece al usuario')
            }
            trip.user = user
            trip.title = data.title ?? trip.title
            trip.description = data.description ?? trip.description
            trip.start_date = data.start_date ?? trip.start_date
            trip.end_date = data.end_date ?? trip.end_date
            trip.number_of_people = data.number_of_people ?? trip.number_of_people
            trip.total_budget = data.total_budget ?? trip.total_budget

            await queryRunner.manager.save(trip)
            if (data.days) {
                for (const dayData of data.days) {

                    let day = await queryRunner.manager.findOne(TripDay, {
                        where: {
                            trips: { id: tripId },
                            day_number: dayData.day_number
                        }
                    })
                    if(!day){
                        day = new TripDay()
                    }
                    day.trips = trip
                    day.day_number = dayData.day_number ?? day.day_number
                    day.notes = dayData.notes ?? day.notes 

                    await queryRunner.manager.save(day)
                    if(dayData.places){
                        for (const placeData of dayData.places) {

                            const place = await queryRunner.manager.findOne(Place,{
                                where: { id: placeData.place_id }
                            })

                            if (!place) throw new Error('Place no existe')

                            let tripPlace = await queryRunner.manager.findOne(TripPlace,{
                                where:{ 
                                    trip_day:{id:day.id},
                                    place:{id: placeData.place_id} 
                                }
                            })
                            if(!tripPlace) tripPlace = new TripPlace()

                            tripPlace.trip_day = day
                            tripPlace.place = place
                            tripPlace.visit_order = placeData.visit_order ?? tripPlace.visit_order
                            tripPlace.planned_start = placeData.planned_start ?? tripPlace.planned_start
                            tripPlace.estimated_cost = placeData.estimated_cost ?? tripPlace.estimated_cost

                            await queryRunner.manager.save(tripPlace)
                        }
                    }
                }
            }

            await queryRunner.commitTransaction()

            return trip

        } catch (err) {
            await queryRunner.rollbackTransaction()
            throw err
        } finally {
            await queryRunner.release()
        }
    }
    async deleteTripPlace(dayId: number, placeId: number, userId: number) {
    const tripPlace = await TripPlace.findOne({
        where: {
            trip_day: {
                id: dayId,
                trips: { user: { id: userId } }
            },
            place: { id: placeId }
        },
        relations: ['trip_day', 'trip_day.trip', 'trip_day.trip.user']
        })

        if (!tripPlace) {
            throw new Error('Lugar no encontrado')
        }

        await tripPlace.remove()

        return { message: 'Lugar eliminado' }
    }
}