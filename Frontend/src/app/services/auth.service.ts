import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService{

    getCurrentUserId(): number {
        const token = localStorage.getItem('access');

        if (!token) {
            throw new Error('Token not found');
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
    }
}