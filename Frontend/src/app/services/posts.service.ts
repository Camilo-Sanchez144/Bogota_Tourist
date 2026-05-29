import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/Post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);
  private postsUrl: string = appsettings.postsUrl;

  constructor() {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('access');
    console.log("token")
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getPosts(): Observable<Post[]> {
    console.log("Se invocó el metodo")
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPost(id: number): Observable<Post> {
    console.log("Se invocó el metodo")
    return this.http.get<Post>(`${this.postsUrl}${id}`);
  }

  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, { headers: this.authHeaders() });
  }
}
