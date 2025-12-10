import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/Post';

@Injectable({
  providedIn: 'root',
})
export class ExperiencesService {
  private http = inject(HttpClient);
  private postsUrl: string = appsettings.postsUrl;

  constructor() {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('access');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postsUrl}?user_id=${userId}`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}${id}/`);
  }

  createPost(post: any): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, { headers: this.authHeaders() });
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
}
