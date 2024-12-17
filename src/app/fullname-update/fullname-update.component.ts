import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-fullname-update',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './fullname-update.component.html',
  styleUrls: ['./fullname-update.component.css']
})
export class FullNameUpdateComponent {
  fullName: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  updateName(): void {
    debugger;

    if (!this.fullName.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campo obrigatório',
        detail: 'O nome não pode estar vazio.',
      });
      return;
    }

    this.authService.updateFullName(this.fullName).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Nome atualizado com sucesso!',
        });
        this.fullName = '';
      },
      error: (error) => {
        console.error('Erro ao atualizar o nome:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar o nome. Tente novamente.',
        });
      },
    });
  }
}
