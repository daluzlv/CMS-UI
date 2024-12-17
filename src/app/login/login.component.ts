import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, InputText, Button, FormsModule],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';  

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.successMessage = 'Login realizado com sucesso!';
        this.errorMessage = '';
        console.log('Resposta do servidor:', response);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';
        this.successMessage = '';
        console.error('Erro:', error);
      },
    });
  }
}
