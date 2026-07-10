import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { IEvent } from '../interfaces/Event';
import { IEventParticipant} from '../interfaces/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);
  private eventsUrl: string = appsettings.eventsUrl;
  private eventsParcicipantUrl: string = appsettings.eventParcicipantUrl;
  constructor() {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('access');
    return new HttpHeaders({ Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache',  // 👈
        'Pragma': 'no-cache' });
  }
  
  getEvent(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.eventsUrl, { headers: this.authHeaders(), params: { t: Date.now().toString()}});
  }

  getEventById(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.eventsUrl}/${id}`, { headers: this.authHeaders() });
  }

  createevent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(this.eventsUrl, event, { headers: this.authHeaders() });
  }

  updateEvent(id: number, event: Partial<IEvent>): Observable<IEvent> {
    return this.http.put<IEvent>(`${this.eventsUrl}/event/${id}/`, event, { headers: this.authHeaders() });
  }
  deleteEvent(eventId:number): Observable<IEvent> {
    return this.http.delete<IEvent>(`${this.eventsUrl}/event/${eventId}`, { headers: this.authHeaders() });
  }
  joinEvent(eventId:number):Observable<IEventParticipant>{
    return this.http.post<IEventParticipant>(`${this.eventsParcicipantUrl}event/${eventId}`,{}, { headers: this.authHeaders() })
  }
  leaveEvent(eventId:number):Observable<IEventParticipant>{
    return this.http.delete<IEventParticipant>(`${this.eventsParcicipantUrl}event/${eventId}`, { headers: this.authHeaders() })
  }
  getEventsByUserParticipant():Observable<IEvent[]>{
    return this.http.get<IEvent[]>(`${this.eventsParcicipantUrl}user`, { headers: this.authHeaders() })
  }
  getEventsByUser():Observable<IEvent[]>{
    return this.http.get<IEvent[]>(`${this.eventsUrl}/user`, { headers: this.authHeaders() })
  }
}