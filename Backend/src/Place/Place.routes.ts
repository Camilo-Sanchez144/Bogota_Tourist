import { Router } from 'express'
import { PlaceController } from './Place.controller'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const controller = new PlaceController()

router.post('/places', authMiddleware, (req, res) => controller.create(req, res))
router.get('/places', authMiddleware, (req, res) => controller.getMine(req, res))
router.put('/places/:id', authMiddleware, (req, res) => controller.edit(req, res))
router.delete('/places/:id', authMiddleware, (req, res) => controller.delete(req, res))

export default router