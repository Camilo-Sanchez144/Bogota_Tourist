import { Router } from 'express';
import CommentController  from './Comment.controller';

const router = Router();
router.route('/:id')
    .get()