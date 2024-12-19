import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Menubar } from 'primeng/menubar';
import { Button } from 'primeng/button';
import { MenuItem } from 'primeng/api';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, Button, Menubar],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/home',
    },
    {
      label: 'Login',
      icon: 'pi pi-user',
      routerLink: '/login',
    },
    {
      label: 'Atualizar usuário',
      icon: 'pi pi-user',
      routerLink: '/user-update',
      visible: false,
    },
  ];

  loginSubscription!: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.loginSubscription = this.authService.loginInfo$.subscribe((info) => {
      if (info) {
        this.menuItems[1].visible = false;
        this.menuItems[2].visible = true;
      } else {
        this.menuItems[1].visible = true;
        this.menuItems[2].visible = false;
      }
    });
  }

  ngOnInit(): void {
    this.updateMenuBar(this.isLogged());
  }

  updateMenuBar(info: boolean): void {
    if (info) {
      this.menuItems[1].visible = false;
      this.menuItems[2].visible = true;
    } else {
      this.menuItems[1].visible = true;
      this.menuItems[2].visible = false;
    }
  }

  isLogged = (): boolean => this.authService.isLoggedIn();

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
