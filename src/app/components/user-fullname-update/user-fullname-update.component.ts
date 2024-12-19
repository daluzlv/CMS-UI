import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-update-fullname',
  standalone: true,
  imports: [CommonModule, InputText, Button, ReactiveFormsModule],
  templateUrl: './user-fullname-update.component.html',
  styleUrls: ['./user-fullname-update.component.css'],
})
export class UserFullnameUpdateComponent {
  user: User = {
    id: '',
    email: '',
    fullname: '',
  };

  updateUserNameForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.updateUserNameForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    debugger;
    const token = this.authService.getDecodedToken();

    if (!!token) {
      this.user = {
        id: token.sub!,
        email: token.email,
        fullname: this.updateUserNameForm.controls['fullName'].value,
      };
    }

    if (this.updateUserNameForm.valid && !!token) {
      this.userService.updateFullName(this.user).subscribe({
        next: (response: User) => {
          this.updateUserNameForm.reset();

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Nome atualizado com sucesso.',
          });

          this.router.navigate(['home']);
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar nome.',
          });
        },
      });
    } else {
      this.errorMessage = 'Por favor, preencha o campo corretamente.';
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return (
      this.updateUserNameForm.get(controlName)?.hasError(errorName) ?? false
    );
  }
}
