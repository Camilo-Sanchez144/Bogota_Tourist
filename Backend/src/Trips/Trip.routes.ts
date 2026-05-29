import { Router } from 'express'
import TripController from './Trip.controller'

const router = Router()

router.get('/trips',TripController.getTripsByUser)
router.post('/trips',TripController.createTrip)
router.patch('/trips/:tripId',TripController.editTrip)
router.delete('/trips/:tripId',TripController.deleteTrip)
router.delete('/trips/:tripId/days/:dayNumber',TripController.deleteTripDay)
router.delete('/days/:dayNumber/places/:tripPlaceId',TripController.deleteTripPlace)

export default router