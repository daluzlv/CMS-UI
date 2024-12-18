import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Menubar } from 'primeng/menubar';
import { Button } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, Button, Menubar, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  menuItems = [
    { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
    { label: 'Login', icon: 'pi pi-user', routerLink: ['/login'] },
  ];
  
    constructor(
      private router: Router,
      private authService: AuthService,
    ) {}
  
    ngOnInit(): void {
      if (this.isLogged())
        this.menuItems = [
          ...this.menuItems,
          {
            label: 'Atualizar usuário',
            icon: 'pi pi-user',
            routerLink: ['/user-update'],
          },
        ];
    }
  
    isLogged = (): boolean => this.authService.isLoggedIn();
  
    onLogout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }

}
