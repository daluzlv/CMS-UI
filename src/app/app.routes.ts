import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { FullNameUpdateComponent } from './fullname-update/fullname-update.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'user-update', component: FullNameUpdateComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: 'home' }
]
