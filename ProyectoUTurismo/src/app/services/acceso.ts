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
  private usersUrl:string = appsettings.usersUrl; // usa la URL exacta que expone tu backend
  private tokenUrl:string = appsettings.tokenUrl;

  constructor(){}

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

  /**
   * Obtiene un usuario por id usando el token actual
   */
  getUserById(id: number): Observable<Usuario> {
    const headers = this.authHeaders();
    return this.http.get<Usuario>(`${this.usersUrl}${id}/`, { headers });
  }

  /** Actualiza un usuario por id (PUT). Usa FormData o JSON según lo que envíes */
  updateUser(id: number, body: any): Observable<Usuario> {
    const headers = this.authHeaders();
    return this.http.put<Usuario>(`${this.usersUrl}${id}/`, body, { headers });
  }

}
