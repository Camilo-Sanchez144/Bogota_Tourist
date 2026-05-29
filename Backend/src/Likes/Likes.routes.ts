import { Router } from 'express';
import LikeController from './Likes.controller';

const router = Router();

router.post('/post/:postId', LikeController.toggleLike);

export default router;