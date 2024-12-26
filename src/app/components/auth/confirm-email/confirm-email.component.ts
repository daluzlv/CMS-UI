import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from 'primeng/api';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [],
  template: '',
  styles: '',
})
export class ConfirmEmailComponent implements OnInit {
  userId: string = '';
  token: string = ''

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    debugger;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.token = params['token'];
    });

    if (!!this.userId && !!this.token) {
      this.authService.confirmEmail(this.userId, this.token).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'E-mail confirmado com sucesso.',
          });
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao confirmar o e-mail.',
          });

          console.error('Erro:', error);
        },
      });
    }
  }
}
