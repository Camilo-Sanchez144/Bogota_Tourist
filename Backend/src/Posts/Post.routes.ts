// Post.routes.ts
import { Router } from 'express';
import PostController  from './Post.controller';
import { upload }  from '../Cloudinary/Cloudinary'

const router = Router();
router.get('/',PostController.getPosts)
router.get('/:postId',PostController.getPostById)
router.get('/user/', PostController.getPostByUser)
router.post('/createPost',upload.single('image'), PostController.createPost)
router.route('/:postId/user')
    .put(upload.single('image'), PostController.updatePost)
    .patch(upload.single('image'),PostController.patchPost)
    .delete(PostController.deletePost)

export default router;