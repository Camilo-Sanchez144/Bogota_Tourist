import User from '../User/User.entity'
import Posts from './Post.entity'
export class PostService{
    async getPosts(){
        const posts = await Posts.find({where: {is_active:true}, relations:{user:true}})
        return posts;
    }
    async getPostById(postId:number){
        const postById = await Posts.findOne({where: {id:Number(postId)}, relations:{user:true}})
        if(!postById || !postById.is_active){
            throw new Error('El post no existe')
        }
        return postById;
    }
    async getPostByUser(userId:number){
        const user = await User.findOne({ where: { id: userId } })
        if (!user || user.status === 0 ) {
            throw new Error('Usuario no existe o está desactivado')
        }
        const postByUser = await Posts.find({where: { user: { id: userId }, is_active: true }})
        return postByUser;
    }
    async createPost(userId:number, data:any){
        const user = await User.findOne({ where: { id: userId } })
        if(user?.status == 0 || !user){
            throw new Error ('Usuario desactivado o no existe')
        }
        const createPost = new Posts()
        
        createPost.title = data.title;
        createPost.description = data.description;
        createPost.user = user
        createPost.imageUrl = data.imageUrl;

        await createPost.save();
        
        return createPost;
    }
    async updatePost(userId:number, data: {title: string , description: string, imageUrl?: string}, postId: number){
        const post = await Posts.findOne({where:{id:postId},  relations: ['user']})
        if(!post){
            throw new Error("Post no encontrado");
        }
        if (post?.user?.id !== userId) {
            throw new Error('No autorizado')
        }
        if (post?.user.status === 0){
            throw new Error ("Usuario desactivado")
        }
        if (!data.title || data.title.trim() === '') {
            throw new Error('Título requerido')
        }
        if (!data.description || data.description.trim() === '') {
            throw new Error('Descripción requerida')
        }
        post.title = data.title;
        post.description = data.description;
        post.imageUrl = data.imageUrl ?? post.imageUrl

        await post.save()
        
        return post;
    }
    async patchUser(postId: number, userId:number, data: any) {
        const post = await Posts.findOne({where:{id:postId},  relations: ['user']})
        if(!post || !post.is_active){
            throw new Error('El Post no existe o está desactivado')
        }
        if (post?.user?.id !== userId) {
            throw new Error('No autorizado')
        }
        if (post?.user.status === 0){
            throw new Error ("Usuario desactivado")
        }
        post.title = data.title ?? post.title;
        post.description = data.description ?? post.description;
        post.imageUrl = data.imageUrl ?? post.imageUrl
        await post.save()
        return await Posts.findOne({ where: { id: Number(postId) } });
    }
    async deletePost(postId:number, userId:number){
        const postDelete = await Posts.findOneBy({ id: Number(postId) })
        if(!postDelete){
            throw new Error("Post no encontrado");
        }
        if (postDelete.user?.id !== userId) {
            throw new Error('No autorizado')
        }
        postDelete.is_active = false
        await postDelete.save()
        return postDelete
    }
}