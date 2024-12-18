import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Button, Menubar, RouterLink],
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  menuItems = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Login', icon: 'pi pi-user', routerLink: '/login' },
    { label: 'Atualizar usuário', icon: 'pi pi-user', routerLink: '/user-update' },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
