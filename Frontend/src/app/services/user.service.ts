import { userProfile } from './../interfaces/UserProfile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable, map } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';
import { ResponseAcceso } from '../interfaces/ResponseAccess';
import { LoginCredentials } from '../interfaces/LoginCredentials';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private userProfileUrl:string =appsettings.userProfileUrl;
  private usersUrl:string = appsettings.usersUrl;
  private tokenUrl:string = appsettings.tokenUrl;



  private authHeaders(): HttpHeaders | undefined {
    const token = localStorage.getItem('access');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
  }

  registrarse(objeto:Usuario):Observable<any>{
    return this.http.post<any>(`${this.usersUrl}`, objeto)
  }
  login(objeto:LoginCredentials):Observable<ResponseAcceso>{
    return this.http.post<ResponseAcceso>(`${this.tokenUrl}`, objeto)
  }

  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.usersUrl}`,{ headers: this.authHeaders() });
  }
  updateUser(id: number, body: any): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.usersUrl}`, body, { headers: this.authHeaders() });
  }
  patchUser(body:any):Observable<userProfile>{
    return this.http.patch<userProfile>(`${this.usersUrl}`, body, { headers: this.authHeaders() })
  }
  updateUserProfile(id: number, body: any): Observable<userProfile> {
    return this.http.put<userProfile>(`${this.userProfileUrl}`, body, { headers: this.authHeaders() });
  }
  

}
