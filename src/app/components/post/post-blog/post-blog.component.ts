import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';

import { PostService } from '../../../services/post.service';
import { HttpErrorResponse } from '@angular/common/http';

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
export class PostBlogComponent implements OnInit {
  postForm: FormGroup;

  isEdit: boolean = false;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private messageService: MessageService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      bannerUrl: [''],
    });
  }

  ngOnInit(): void {
    let tempId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!!tempId) {
      this.id = tempId;
      this.getPost(this.id);
    }
  }

  getPost(id: string) {
    this.postService.getById(id).subscribe({
      next: (response) => {
        debugger
        this.postForm.controls['title'].setValue(response.title ?? '');
        this.postForm.controls['content'].setValue(response.content ?? '');
        this.postForm.controls['bannerUrl'].setValue(response.bannerUrl ?? '');
        if (!this.postService.canEdit(response.userId)) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Você não tem autorização para atualizar esta postagem.',
          });
          this.postForm.disable();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao recuperar postagenm.',
        });
        console.error('Erro:', error);
      },
    });
  }

  onSubmit() {
    if (!!this.id && this.postForm.valid) {
      this.put(this.id);
    } else if (this.postForm.valid) {
      this.post();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Por favor, preencha todos os campos corretamente.',
      });
    }
  }

  post() {
    this.postService.post(this.postForm.value).subscribe({
      next: (response) => {
        this.postForm.reset();
        this.router.navigate(['post', response.id]);
      },
      error: (error) => {
        console.error('Erro:', error);
      },
    });
  }

  put(id: string) {
    this.postService.put(id, this.postForm.value).subscribe({
      next: (response) => {
        this.postForm.reset();
        this.router.navigate(['post', response.id]);
      },
      error: (error) => {
        console.error('Erro:', error);
      },
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.postForm.get(controlName)?.hasError(errorName) ?? false;
  }
}
