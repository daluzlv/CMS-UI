import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../../services/auth.service';
import { CommentService } from '../../../services/comment.service';

import { PostComment } from '../../../models/comment.model';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-post-comment-edit',
  standalone: true,
  imports: [ButtonModule, CommonModule, ReactiveFormsModule, DividerModule],
  templateUrl: './post-comment-edit.component.html',
  styleUrl: './post-comment-edit.component.css',
})
export class PostCommentEditComponent implements OnInit {
  commentForm: FormGroup;
  isEditing: boolean = false;
  isEditable: boolean = false;
  @Input() comment: PostComment = {
    content: '',
    createdAt: new Date(),
    fullName: '',
    id: '',
    userId: '',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private commentService: CommentService
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isEditable = this.commentService.canEdit(this.comment.userId);
    this.commentForm.controls['content'].setValue(this.comment.content);
  }

  isLogged = (): boolean => this.authService.isLoggedIn();

  inputCommentPlaceholder(): string {
    return this.isLogged()
      ? 'Digite seu comentário...'
      : 'É necessário logar para deixar um comentário...';
  }

  edit(): void {
    this.isEditing = true;
  }

  updateComment(): void {
    if (
      this.commentForm.valid &&
      this.commentService.canEdit(this.comment.userId)
    ) {
      this.commentService
        .put(this.comment.id, this.commentForm.value)
        .subscribe({
          next: (response) => {
            this.isEditing = false;
            this.commentForm.reset();
            this.comment = response;
            this.commentForm.controls['content'].setValue(this.comment.content);
          },
          error: (error: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao atualizar comentário.',
            });

            console.error('Error: ', error);
          },
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Você não tem autorização para atualizar esta postagem.',
      });
    }
  }

  cancel(): void {
    this.isEditing = false;
    this.commentForm.reset();
    this.commentForm.controls['content'].setValue(this.comment.content);
  }
}
