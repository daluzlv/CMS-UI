import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Button } from 'primeng/button';
import { Menubar } from 'primeng/menubar';

import { AuthService } from '../../services/auth.service';

import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Button, Menubar, RouterLink, PostComponent],
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  menuItems = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Login', icon: 'pi pi-user', routerLink: '/login' },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const isLogged = this.isLogged();
    if (isLogged)
      this.menuItems = [
        ...this.menuItems,
        {
          label: 'Atualizar usuário',
          icon: 'pi pi-user',
          routerLink: '/user-update',
        },
      ];
  }

  isLogged = (): boolean => this.authService.isLoggedIn();

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
