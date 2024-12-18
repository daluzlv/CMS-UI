import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Button } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';

import { PostCardComponent } from '../post-card/post-card.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Button, Menubar, RouterLink, PostCardComponent],
  templateUrl: './home.component.html',
  styles: [],
  providers: [MessageService, AuthService, PostService],
})
export class HomeComponent implements OnInit {
  menuItems = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Login', icon: 'pi pi-user', routerLink: '/login' },
  ];

  postList: Post[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private postService: PostService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.isLogged())
      this.menuItems = [
        ...this.menuItems,
        {
          label: 'Atualizar usuário',
          icon: 'pi pi-user',
          routerLink: '/user-update',
        },
      ];

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

  isLogged = (): boolean => this.authService.isLoggedIn();

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
