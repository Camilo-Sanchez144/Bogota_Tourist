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
export class Acceso {
  private http =inject(HttpClient);
  private baseUrl:string = appsettings.apiUrl;
  private registroUrl:string = appsettings.usersUrl;

  constructor(){}

  registrarse(objeto:Usuario):Observable<any>{
    return this.http.post<any>(`${this.registroUrl}`, objeto)
  }
  login(objeto:LoginCredentials):Observable<ResponseAcceso>{
    return this.http.post<ResponseAcceso>(`${this.baseUrl}/token/`, objeto)
  }

  /**
   * Obtiene un usuario por id usando el token actual
   */
  getUserById(id: number): Observable<Usuario> {
    const token = localStorage.getItem('access');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.get<Usuario>(`${this.registroUrl}${id}`, { headers });
  }

}
