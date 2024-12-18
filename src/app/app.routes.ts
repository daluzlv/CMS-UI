import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { FullNameUpdateComponent } from './components/fullname-update/fullname-update.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'user-update', component: FullNameUpdateComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: 'home' }
]
