import { Usuario } from "./Usuario"
import { Post } from "./Post"
export interface Comments{
    id:number
    content: string
    replies: Comments[]
    user: Usuario
    post: Post
}