import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { Post } from '../../models/post.model';
import { PostComment } from '../../models/comment.model';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';

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
export class PostComponent implements OnInit {
  post!: Post;

  comments: PostComment[] = [
    {
      content: 'xyz',
      createdAt: new Date(),
      fullName: 'xyz',
      id: 'xyz',
    },
    {
      content: 'xyz',
      createdAt: new Date(),
      fullName: 'xyz',
      id: 'xyz',
    },
  ];
  newComment: string = '';

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!!id) this.getPost(id!);
  }

  isLogged = (): boolean => this.authService.isLoggedIn();

  inputCommentPlaceholder() {
    return this.isLogged()
      ? 'Digite seu comentário...'
      : 'É necessário logar para deixar um comentário...';
  }

  getPost(id: string) {
    this.postService.getById(id).subscribe({
      next: (response: Post) => {
        this.post = response;
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao recuperar as postagens.',
        });
        console.error('Erro:', error);
      },
    });
  }
}
