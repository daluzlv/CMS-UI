import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';

import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-blog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    TextareaModule,
    Button,
  ],
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.css'],
})
export class PostBlogComponent {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private postService: PostService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      bannerUrl: [''],
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.postService.post(this.postForm.value).subscribe({
        next: (response) => {
          this.postForm.reset();
          this.router.navigate(['post', response.id]);
        },
        error: (error) => {
          console.error('Erro:', error);
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Por favor, preencha todos os campos corretamente.',
      });
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.postForm.get(controlName)?.hasError(errorName) ?? false;
  }
}
