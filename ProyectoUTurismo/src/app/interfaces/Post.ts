export interface PostMedia {
    id: number;
    file: string;
    file_type: 'IMAGE' | 'VIDEO';
    alt_text?: string;
}

export interface Post {
    id: number;
    title?: string;
    description: string;
    rating: number;
    likes_count: number;
    comments_count: number;
    user: number; 
    location: number; 
    created_at: string;
    media_files?: PostMedia[];
    is_featured: boolean;
    image?: string;
}
