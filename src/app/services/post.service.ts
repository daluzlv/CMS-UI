import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Post } from '../models/post.model';
import { PostComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = `${environment.apiUrl}/post`;

  constructor(private http: HttpClient) {}

  get(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  post(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}`, post);
  }

  postComment(postId: string, comment: string): Observable<PostComment> {
    return this.http.post<PostComment>(`${this.baseUrl}/${postId}/comment`, {
      content: comment,
    });
  }
}
