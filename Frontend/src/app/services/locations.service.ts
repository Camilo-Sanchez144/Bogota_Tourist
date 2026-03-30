import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { Place } from '../interfaces/Place';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private http = inject(HttpClient);
  private placesUrl: string = appsettings.placesUrl;

  constructor() {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('access');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.placesUrl);
  }

  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.placesUrl}${id}/`);
  }

  createPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(this.placesUrl, place, { headers: this.authHeaders() });
  }

  getPlaceReviews(placeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.placesUrl}${placeId}/reviews/`);
  }

  getUserReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${appsettings.baseUrl}/reviews/my-reviews/`, { headers: this.authHeaders() });
  }

  createReview(review: any): Observable<any> {
    return this.http.post<any>(`${appsettings.baseUrl}/reviews/`, review, { headers: this.authHeaders() });
  }
}
