import { Request, Response } from 'express';
import { CommentService } from './Comment.service';
class CommentController{
    private commentService = new CommentService()
    async getCommentsByPost(req:Request,res:Response){
        try{
            const postId = Number(req.params.postId)
            const getComment = await this.commentService.getCommentsByPost(postId)
            res.status(200).send(getComment)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    async createComment(req:Request,res:Response){
        try{
            const postId = Number(req.params.postId)
            const userId = Number(req.params.userId)
            if (isNaN(postId) || isNaN(userId)) {
                return res.status(400).send('IDs inválidos')
            }
            const { content, parentId } = req.body;
            if (!content || content.trim() === '') {
                return res.status(400).send('Contenido requerido')
            }
            const newComment = await this.commentService.createComment(userId, postId, { content }, parentId)
            res.status(201).send(newComment)
        }catch(err){
            if(err instanceof Error){
                if (err.message.includes('no existe')) {
                    return res.status(404).send(err.message)
                }
            res.status(500).send(err.message);
            }
        }
    }
}
export default new CommentController()