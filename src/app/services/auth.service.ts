import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/authentication`;
    const payload = { email, password };

    return this.http.post<any>(url, payload);
  }

  updateFullName(fullName: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/`, { fullName });
  }
}
