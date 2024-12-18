import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/post`);
  }
}
