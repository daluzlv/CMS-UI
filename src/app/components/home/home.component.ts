import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';

import { Post } from '../../models/post.model';

import { PostCardComponent } from '../post/post-card/post-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './home.component.html',
  styles: [],
  providers: [MessageService, AuthService, PostService],
})
export class HomeComponent implements OnInit {
  postList: Post[] = [];

  constructor(
    private postService: PostService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postService.get().subscribe({
      next: (response: Post[]) => {        
        this.postList = response;
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

  postRedirect(id: string) {
    this.router.navigate(['/post', id]);
  }
}
