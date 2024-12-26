import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { jwtDecode } from 'jwt-decode';

import { environment } from '../../environments/environment';

import { Register } from '../models/register.model';
import { DecodedToken, Token } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private loginInfo = new Subject<boolean>();
  loginInfo$ = this.loginInfo.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/authentication`;
    const payload = { email, password };

    return this.http.post<any>(url, payload);
  }

  updateFullName(fullName: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/`, { fullName });
  }

  setToken(token: Token) {
    localStorage.setItem('auth_token', token.accessToken);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.updateLoginSubject(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  updateLoginSubject(info: boolean) {
    this.loginInfo.next(info);
  }

  register(registerData: Register): Observable<any> {
    const url = `${this.baseUrl}/authentication/register`;

    return this.http.post<any>(url, registerData);
  }

  confirmEmail(userId: string, token: string) {
    const url = `${this.baseUrl}/authentication/confirm-email?userId=${userId}&token=${encodeURIComponent(token)}`;

    return this.http.get<any>(url)
  }

  getDecodedToken(): DecodedToken | null {
    if (this.isLoggedIn()) return jwtDecode(this.getToken()!);

    return null;
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }
}
