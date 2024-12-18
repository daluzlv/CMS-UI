import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Token } from '../models/auth/token.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, InputText, Button, FormsModule],
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService
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

        console.log('Resposta do servidor:', response);
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
}
