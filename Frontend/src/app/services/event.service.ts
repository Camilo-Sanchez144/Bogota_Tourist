import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);
  private eventsUrl: string = appsettings.eventsUrl;

  constructor() {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('access');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
  
  getEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl, { headers: this.authHeaders() });
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.eventsUrl}/${id}`, { headers: this.authHeaders() });
  }

  createevent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventsUrl, event, { headers: this.authHeaders() });
  }

  updateTrip(id: number, event: Partial<Event>): Observable<Event> {
    return this.http.put<Event>(`${this.eventsUrl}/event/${id}/`, event, { headers: this.authHeaders() });
  }
}
