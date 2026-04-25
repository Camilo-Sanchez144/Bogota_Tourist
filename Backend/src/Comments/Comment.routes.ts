import { Router } from 'express';
import CommentController  from './Comment.controller';

const router = Router();
router.get('/post/:postId', CommentController.getCommentsByPost)
router.post('/post/:postId/user/:userId', CommentController.createComment)
router.put('/:commentId/user/:userId', CommentController.editComment)
router.delete('/:commentId/user/:userId', CommentController.deleteComment)

export default router;