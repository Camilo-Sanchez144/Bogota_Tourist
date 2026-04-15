import User from '../User/User.entity'
import Posts from './Post.entity'
export class Post{
    async ConsultarPosts(){
        const posts = await Posts.find({relations:{user:true}})
        return posts;
    }
    async ConsultarPostId(id:any){
        const postById = await Posts.findOne({where: {id:Number(id)}, relations:{user:true}})
        if(!postById){
            throw new Error('El post no existe')
        }
        return postById;
    }
    async ConsultarPostPorUsuario(id:any){
        const postByUser = await Posts.find({where: {user:{id: id}}})
        return postByUser;
    }
    async CrearPost(data:any){
        const crearPost = new Posts()
        
        crearPost.title = data.title;
        crearPost.description = data.description;
        crearPost.user = data.user;
        crearPost.imageUrl = data.imageUrl;

        await crearPost.save();
        
        return crearPost;
    }
    async ActualizarPost(id:any, data:any){
        const post = await Posts.findOneBy({id:Number(id)})
        if(!post){
            throw new Error("Post no encontrado");
        }
        post.title = data.title;
        post.description = data.description;
        post.user = data.user;
        post.imageUrl = data.imageUrl;

        await post.save()
        
        return post;
    }
    async ActualizarPostParcial(id: any, data: any) {
        await Posts.update(Number(id), data);
        return await Posts.findOne({ where: { id: Number(id) } });
    }
    async BorrarPost(id:any){
        const postDelete = await User.findOneBy({id:Number(id)})
        if(!postDelete){
            throw new Error("Usuario no encontrado");
        }
        await postDelete.remove();
        return postDelete;
    }
}