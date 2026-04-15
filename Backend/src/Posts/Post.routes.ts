// Post.routes.ts
import { Router } from 'express';
import PostController  from './Post.controller';
import { upload }  from '../Cloudinary/Cloudinary'

const router = Router();
router.get('/',PostController.ConsultarPosts)
router.post('/', upload.single('image'), PostController.crearPost);
router.route('/:id')
    .get(PostController.ConsultarPostDetalle)
    .put(upload.single('image'), PostController.ActualizarPost)
    .patch(upload.single('image'),PostController.ActualizarPostParcial)
    .delete(PostController.BorrarPost)
router.get('/:id/user', PostController.ConsultarPostPorUsuario)

export default router;