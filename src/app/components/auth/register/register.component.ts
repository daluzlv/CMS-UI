import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { InputText } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FloatLabel,
    InputText,
    Button,
    ReactiveFormsModule,
    Tooltip,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      confirmPassword: [''],
    });
  }

  onSubmit() {
    if (
      this.registerForm.valid &&
      this.registerForm.controls['password'].value ===
        this.registerForm.controls['confirmPassword'].value
    ) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário cadastrado com sucesso.',
          });

          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao cadastrar usuário.',
          });

          console.error('Erro:', error);
        },
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const isValid = hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

    return isValid ? null : { passwordStrength: true };
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.registerForm.get(controlName)?.hasError(errorName) ?? false;
  }
}
