import { Comment } from "./Comments.entity" 
import { Post } from '../Posts/Post.entity'
import { User } from '../User/User.entity'
import { IsNull } from 'typeorm';
export class CommentService{    
    async getCommentsByPost(postId: number) {
        const comments = await Comment.find({
            where: {
                post: { id: postId },
                is_active: true,
                parent: IsNull()
            },
            relations: ['user', 'replies', 'replies.user'],
            order: { created_at: 'DESC' }
        })
        return comments;
    }
    async createComment(userId:number, postId:number, data:{ content: string }, parentId?:number){
        let parentCommentEntity: Comment | null = null
        const post = await Post.findOne({where:{id:postId}})
        if(!post){
            throw new Error('Post no existe')
        }
        const user = await User.findOne({where:{id:userId}})
        if(!user){
            throw new Error('User no existe')
        }
        if (parentId) {
            const parentComment = await Comment.findOne({where:{id:parentId, post: { id: postId }}})
            if(!parentComment){
                throw new Error('Comentario padre no existe')
            }
            if (!parentComment.is_active) {
                throw new Error('Comentario no disponible')
            }
            parentCommentEntity = parentComment
        }
        if (!data.content || data.content.trim() === '') {
            throw new Error('Contenido requerido')
        }
        if (!post.is_active) {
            throw new Error('No puedes comentar en un post inactivo')
        }
        const newComment = new Comment()
        newComment.user = user
        newComment.post = post
        newComment.content = data.content
        newComment.parent = parentCommentEntity
        await newComment.save()

        post.comments_count += 1
        await post.save()

        return newComment
    }
    async EditComment(userId:number, data:{ content: string }, commentId:number){
        const userComment = await  Comment.findOne({where:{id:commentId, user:{id:userId}}})
        if(!userComment){
            throw new Error('No existe o no pertenece al usuario')
        }
        if (!userComment.is_active) {
            throw new Error('Comentario no disponible')
        }
        if (!data.content || data.content.trim() === '') {
            throw new Error('Contenido requerido')
        }
        userComment.content = data.content
        await userComment.save()
        return userComment
    }
    async DeleteComment(commentId:number, userId:number){
        const comment = await Comment.findOne({where: {id:(commentId),  user: { id: userId }, is_active: true}, relations: ['post']})
        if(!comment){
            throw new Error('Comentario no disponible o no existe')
        }
        const post = await Post.findOne({ where: { id: comment.post.id } })
        if (post && comment.is_active) {
            post.comments_count -= 1
            await post.save()
        }
        comment.is_active = false
        await comment.save()
        return comment
    }

}