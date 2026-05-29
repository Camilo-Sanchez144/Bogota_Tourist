import { Router } from 'express';
import CommentController  from './Comment.controller';

const router = Router();
router.get('/post/:postId', CommentController.getCommentsByPost)
router.post('/post/:postId', CommentController.createComment)
router.put('/:commentId', CommentController.editComment)
router.delete('/:commentId', CommentController.deleteComment)

export default router;