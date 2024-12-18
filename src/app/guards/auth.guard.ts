import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private messageService: MessageService) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Acesso negado. Redirecionando para login...',
      });
      
      return this.router.createUrlTree(['/login']);
    }
  }
}
