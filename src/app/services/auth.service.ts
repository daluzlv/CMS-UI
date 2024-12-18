import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

import { environment } from '../../environments/environment';

import { DecodedToken, Token } from '../models/token.model';
import { Register } from '../models/register.model';

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
    const url = `${this.baseUrl}/auth/register`;

    return this.http.post<any>(url, registerData);
  }

  getDecodedToken(): DecodedToken | null {
    if (this.isLoggedIn()) return jwtDecode(this.getToken()!);

    return null;
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }
}
