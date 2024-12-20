import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AuthService } from '../../../services/auth.service';
import { PostService } from '../../../services/post.service';

import { Post } from '../../../models/post.model';

import { PostCommentEditComponent } from "../post-comment-edit/post-comment-edit.component";

import { formatBrDate } from '../../../utils/date';

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    RouterLink,
    ReactiveFormsModule,
    PostCommentEditComponent
],
})
export class PostComponent implements OnInit {
  post: Post = {
    bannerUrl: '',
    content: '',
    createdAt: new Date(),
    fullName: '',
    id: '',
    title: '',
    userId: '',
    comments: [],
  };

  id: string = '';

  newCommentForm: FormGroup;
  isEditable: boolean = false;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.newCommentForm = this.fb.group({
      comment: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    let tempId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!!tempId) {
      this.id = tempId;
      this.getPost();
    }
  }

  isLogged = (): boolean => this.authService.isLoggedIn();

  editLink = () => `/post/${this.id}/edit`;

  inputCommentPlaceholder() {
    return this.isLogged()
      ? 'Digite seu comentário...'
      : 'É necessário logar para deixar um comentário...';
  }

  getPost() {
    this.postService.getById(this.id).subscribe({
      next: (response: Post) => {
        this.post = response;
        this.isEditable = this.postService.canEdit(this.post.userId);
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

  formatDate = (date: Date) => formatBrDate(new Date(date));

  comment() {
    if (this.newCommentForm.valid) {
      this.postService
        .postComment(this.id, this.newCommentForm.controls['comment'].value)
        .subscribe({
          next: () => {
            this.newCommentForm.reset();
            this.getPost();
          },
          error: (error: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao persistir comentário.',
            });
            console.error('Erro:', error);
          },
        });
    }
  }
}
