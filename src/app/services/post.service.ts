import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';

import { Post } from '../models/post.model';
import { PostComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = `${environment.apiUrl}/post`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  get(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  post(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}`, post);
  }

  put(id: string, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, post);
  }

  postComment(postId: string, comment: string): Observable<PostComment> {
    return this.http.post<PostComment>(`${this.baseUrl}/${postId}/comment`, {
      content: comment,
    });
  }

  canEdit(postUserId: string) {
    const user = this.authService.getDecodedToken();
    return user?.sub === postUserId;
  }
}
