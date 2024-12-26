import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post/post.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PostBlogComponent } from './components/post/post-blog/post-blog.component';
import { ConfirmEmailComponent } from './components/auth/confirm-email/confirm-email.component';
import { UserFullnameUpdateComponent } from './components/user/user-fullname-update/user-fullname-update.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  {
    path: 'user-update',
    component: UserFullnameUpdateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'home', component: HomeComponent },
  { path: 'post', component: PostBlogComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostComponent },
  { path: 'post/:id/edit', component: PostBlogComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' },
];
