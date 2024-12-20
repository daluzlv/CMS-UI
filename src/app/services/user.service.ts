import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  updateFullName(user: User): Observable<User> {
    const decodedToken = this.authService.getDecodedToken();
    if (!decodedToken) return new Observable();

    return this.http.put<User>(`${this.baseUrl}/${decodedToken.sub}`, user);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
