import { Request, Response } from 'express';
import { PostService } from './Post.service';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PostDto } from './Post.dto';
import { UpdatePostDto } from './UpdatePost.dto';

class PostController{
    private postService = new PostService();
    getPosts = async (req: Request, res: Response) => {
        try{
            const getPosts = await this.postService.getPosts()
            res.status(200).send(getPosts)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    getPostById = async (req: Request, res: Response) => {
        try{
            const postId = Number(req.params.postId)
            const getPosts = await this.postService.getPostById(postId)
            res.status(200).send(getPosts)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    getPostByUser = async (req: Request, res: Response)=>{
        try{
            const userId = Number(req.params.userId)
            const getPosts = await this.postService.getPostByUser(userId)
            res.status(200).send(getPosts)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    createPost = async (req: Request, res: Response)=>{
        try {
            const userId = Number(req.params.userId)
            if (!req.file) {
                res.status(400).json({ message: 'La imagen es obligatoria' });
                return;
            }
            if(isNaN(userId)){
                res.status(400).send('user debe ser un numero')
                return;
            }
            const dto = plainToInstance(PostDto, req.body)
            const errors =await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const imageUrl = (req.file as any)?.secure_url ?? req.file?.path;
            const newPost = await this.postService.createPost(userId,{ ...dto,imageUrl});
            res.json(newPost);

        } catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    };
    updatePost = async (req: Request, res: Response)=>{
        try{
            const userId = Number(req.params.userId)
            const postId = Number(req.params.postId)
            const dto = plainToInstance(PostDto, req.body)
            const errors =await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const imageUrl = (req.file as any)?.secure_url ?? req.file?.path;
            const newPost = await this.postService.updatePost(userId,{ ...dto,imageUrl}, postId);
            res.json(newPost);
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    patchPost = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.userId)
            const postId = Number(req.params.postId)

            const dto = plainToInstance(UpdatePostDto, req.body);
            const errors = await validate(dto);
            if (errors.length > 0) {
                return res.status(400).json({ mensaje: 'Error en la validación', errors });
            }

            const imageUrl = (req.file as any)?.secure_url ?? req.file?.path;
            const data = { ...dto, ...(imageUrl && { imageUrl }) };

            const updatedPost = await this.postService.patchUser(postId, userId, data);
            res.json(updatedPost);

        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    deletePost = async (req: Request, res: Response)=>{
        try{
            const userId = Number(req.params.userId)
            const postId = Number(req.params.postId)
            await this.postService.deletePost(postId, userId);
            return res.status(204).send()
        }catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new PostController()