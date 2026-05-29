import { Usuario } from "./Usuario";

export interface Post {
    id: number;
    title: string;
    description: string;
    likes_count: number;
    comments_count: number;
    imageUrl: string;
    user: Usuario; 
    created_at: string;
}
