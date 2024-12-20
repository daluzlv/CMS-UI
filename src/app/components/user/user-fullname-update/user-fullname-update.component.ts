import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Button } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

import { User } from '../../../models/user.model';

@Component({
  selector: 'app-update-fullname',
  standalone: true,
  imports: [CommonModule, InputText, FloatLabel, Button, ReactiveFormsModule],
  templateUrl: './user-fullname-update.component.html',
  styleUrls: ['./user-fullname-update.component.css'],
})
export class UserFullnameUpdateComponent implements OnInit {
  user: User = {
    id: '',
    email: '',
    fullName: '',
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

  ngOnInit(): void {
    const token = this.authService.getDecodedToken();
    this.user = {
      id: token?.sub ?? '',
      email: token?.email ?? '',
      fullName: '',
    };

    this.userService.getById(token?.sub!).subscribe({
      next: (response: User) => {
        if (!!response) {
          this.user = response;
          this.updateUserNameForm.controls['fullName'].setValue(
            this.user.fullName
          );
        } else {
          this.user = {
            id: token?.sub ?? '',
            email: token?.email ?? '',
            fullName: '',
          };
        }
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar nome.',
        });

        console.error(error);
      },
    });
  }

  onSubmit() {
    this.user.fullName = this.updateUserNameForm.controls['fullName'].value;

    if (this.updateUserNameForm.valid) {
      this.userService.updateFullName(this.user).subscribe({
        next: () => {
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

          console.error(error);
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
