import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/Post';
import { Comments } from '../interfaces/Comments';

@Injectable({
  providedIn: 'root',
})
export class ExperiencesService {
  private http = inject(HttpClient);
  private postsUrl: string = appsettings.postsUrl;
  private commentsUrl: string = appsettings.commentsUrl;
  private likeUrl: string = appsettings.likeUrl;
  
  constructor() {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('access');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl, { headers: this.authHeaders() });
  }

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postsUrl}?user_id=${userId}`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/${id}`, {headers: this.authHeaders()});
  }
  getCommentsByPost(id:number): Observable<Comments[]>{
    return this.http.get<Comments[]>(`${this.commentsUrl}/${id}`,{headers: this.authHeaders()} )
  }

  createPost(post: FormData): Observable<Post> {
    return this.http.post<Post>(`${this.postsUrl}/createPost`, post, { headers: this.authHeaders() });
  }

  updatePost(id: number, post: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.postsUrl}${id}/`, post, { headers: this.authHeaders() });
  }

  uploadPostMedia(postId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('post', postId.toString());
    formData.append('file', file);
    formData.append('file_type', 'IMAGE'); // Assuming image for now

    return this.http.post(`${this.postsUrl}media/`, formData, { headers: this.authHeaders() });
  }
  createComment(postId: number, content: string, parentId?: number): Observable<Comments> {
  const body: any = { content };
  if (parentId) body.parentId = parentId;
  return this.http.post<Comments>(`${this.commentsUrl}/${postId}`, body,  { headers: this.authHeaders() });
  }

  toggleLike(postId: number): Observable<{ liked: boolean, likes_count: number }> {
    return this.http.post<{ liked: boolean, likes_count: number }>(`${this.likeUrl}/${postId}`,{},{ headers: this.authHeaders() }
    );
  }
}
