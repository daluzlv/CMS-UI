import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { Post } from '../../models/post.model';
import { PostComment } from '../../models/comment.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
  ],
})
export class PostComponent {
  post: Post = {
    content: '',
    createdAt: new Date(),
    fullName: '',
    id: '',
    imageUrl: 'https://via.placeholder.com/600x400',
    title: '',
  };

  comments: PostComment[] = [
    {
      content: 'xyz',
      createdAt: new Date(),
      fullName: 'xyz',
      id: 'xyz',
    },
  ];
  newComment: string = '';

  constructor(private authService: AuthService) {}

  isLogged = (): boolean => this.authService.isLoggedIn();

  inputCommentPlaceholder() {
    return this.isLogged()
      ? 'Digite seu comentário...'
      : 'É necessário logar para deixar um comentário...';
  }
}
