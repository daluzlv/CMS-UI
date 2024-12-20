import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';

import { PostComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = `${environment.apiUrl}/comment`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  canEdit(postUserId: string): boolean {
    const user = this.authService.getDecodedToken();
    return user?.sub === postUserId;
  }

  put(id: string, comment: PostComment): Observable<PostComment> {
    return this.http.put<PostComment>(`${this.baseUrl}/${id}`, comment);
  }
}
