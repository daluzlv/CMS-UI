import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';

import { AuthService } from '../../services/auth.service';
import { Token } from '../../models/token.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, InputText, Button, FormsModule, DividerModule],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: Token) => {
        this.authService.setToken(response);

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Login realizado com sucesso!',
        });

        this.authService.updateLoginSubject(true);        
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao fazer login. Verifique suas credenciais.',
        });
        console.error('Erro:', error);
      },
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
