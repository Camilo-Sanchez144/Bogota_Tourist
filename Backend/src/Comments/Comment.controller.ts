import { Request, Response } from 'express';
import { CommentService } from './Comment.service';
class CommentController{
    private commentService = new CommentService()
    
    getCommentsByPost = async (req:Request,res:Response)=>{
        try{
            const postId = Number(req.params.postId)
            if (isNaN(postId)) {
                return res.status(400).send('ID inválido')
            }
            const getComment = await this.commentService.getCommentsByPost(postId)
            res.status(200).send(getComment)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    createComment = async (req:Request,res:Response)=>{
        try{
            const postId = Number(req.params.postId)
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            if (isNaN(postId)) {
                return res.status(400).send('ID inválidos')
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
    editComment = async (req:Request,res:Response)=>{
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const commentId = Number(req.params.commentId)
            if (isNaN(commentId)) {
                return res.status(400).send('ID inválidos')
            }
            const { content } = req.body;
            if (!content || content.trim() === '') {
                return res.status(400).send('Contenido requerido')
            }
            const commentEdited = await this.commentService.EditComment(userId, {content} , commentId)
            res.status(200).send(commentEdited)
        }catch(err){
            if(err instanceof Error){
                if (err.message.includes('no existe')) {
                    return res.status(404).send(err.message)
                }
            res.status(500).send(err.message);
            }
        }
    }
    deleteComment = async (req:Request,res:Response)=>{
        try{
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const commentId = Number(req.params.commentId)
            if (isNaN(commentId)) {
                return res.status(400).send('IDs inválidos')
            }
            const commentDeleted = await this.commentService.DeleteComment(commentId,userId)
            res.status(204).send(commentDeleted)
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