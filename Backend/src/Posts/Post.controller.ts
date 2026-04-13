import { Request, Response } from 'express';
import { Post } from './Post.service';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PostDto } from './Post.dto';

class PostController{
    async ConsultarPosts(req: Request, res: Response){
        try{
            const postService = new Post();
            const consultaPosts = await postService.ConsultarPosts()
            res.status(200).send(consultaPosts)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    async ConsultarPostDetalle(req: Request, res: Response){
        try{
            const id = req.params.id
            const postService = new Post()
            const consultaPost = await postService.ConsultarPostId(id)
            res.status(200).send(consultaPost)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    async ConsultarPostPorUsuario(req: Request, res: Response){
        try{
            const id = req.params.id
            const postService = new Post()
            const consultaPost = await postService.ConsultarPostPorUsuario(id)
            res.status(200).send(consultaPost)
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
    async crearPost(req: Request, res: Response){
        try {
            if (!req.file) {
                res.status(400).json({ message: 'La imagen es obligatoria' });
                return;
            }
            const {user} = req.body
            if(isNaN(user)){
                res.status(400).send('user debe ser un numero')
                return;
            }
            const postService = new Post();
            const dto = plainToInstance(PostDto, req.body)
            const errors =await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const imageUrl = (req.file as any)?.secure_url ?? req.file?.path;
            const newPost = await postService.CrearPost({ ...dto,imageUrl});
            res.json(newPost);

        } catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    };
    async ActualizarPost(req: Request, res: Response){
        try{
            const postService = new Post();
            const id = req.params.id
            console.log(id)
            console.log(req.body)
            const dto = plainToInstance(PostDto, req.body)
            console.log(dto)
            const errors =await validate(dto)
            if(errors.length > 0){
                return res.status(400).json({mensaje:'Error en la validación', errors})
            }
            const imageUrl = (req.file as any)?.secure_url ?? req.file?.path;
            const newPost = await postService.ActualizarPost(id,{ ...dto,imageUrl});
            res.json(newPost);
        }catch(err){
            if(err instanceof Error){
            res.status(500).send(err.message);
            }
        }
    }
}

export default new PostController()