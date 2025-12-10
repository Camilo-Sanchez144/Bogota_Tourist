import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { Trip } from '../interfaces/Trip';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private http = inject(HttpClient);
  private tripsUrl: string = appsettings.tripsUrl;

  constructor() {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('access');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl, { headers: this.authHeaders() });
  }

  getTrip(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.tripsUrl}${id}/`, { headers: this.authHeaders() });
  }

  createTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, trip, { headers: this.authHeaders() });
  }

  updateTrip(id: number, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${this.tripsUrl}${id}/`, trip, { headers: this.authHeaders() });
  }
}
