import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Button } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';

import { PostCardComponent } from '../post-card/post-card.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Button, Menubar, RouterLink, PostCardComponent],
  templateUrl: './home.component.html',
  styles: [],
  providers: [MessageService, AuthService, PostService, Router],
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
    this.router.navigateByUrl(`/post/${id}`);
  }
}
