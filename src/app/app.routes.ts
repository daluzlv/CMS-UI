import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';

import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { RegisterComponent } from './components/register/register.component';
import { UserFullnameUpdateComponent } from './components/user-fullname-update/user-fullname-update.component';
import { PostBlogComponent } from './components/post-blog/post-blog.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-update', component: UserFullnameUpdateComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'post', component: PostBlogComponent, canActivate: [AuthGuard] },
    { path: 'post/:id', component: PostComponent },
    { path: '**', redirectTo: 'home' }
]
