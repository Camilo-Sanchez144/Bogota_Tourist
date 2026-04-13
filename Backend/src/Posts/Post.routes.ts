// Post.routes.ts
import { Router } from 'express';
import PostController  from './Post.controller';
import { upload }  from '../Cloudinary/Cloudinary'

const router = Router();
router.get('/',PostController.ConsultarPosts)
router.get('/:id',PostController.ConsultarPostDetalle)
router.get('/:id/user', PostController.ConsultarPostPorUsuario);
router.post('/', upload.single('image'), PostController.crearPost);
router.put('/:id', PostController.ActualizarPost)

export default router;