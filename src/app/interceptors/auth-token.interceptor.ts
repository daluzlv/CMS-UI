import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { AuthService } from '../services/auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = authService.getToken();
  if (!!token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    });
  } else {
    req = req.clone({
      setHeaders: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();

        console.warn(
          'Acesso não autorizado. Redirecionando para a tela de login.'
        );
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
