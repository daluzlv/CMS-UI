import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';

import { PostService } from '../../../services/post.service';

import { Post } from '../../../models/post.model';
import { DecodedToken } from '../../../models/token.model';

import { formatBrDate } from '../../../utils/date';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CardModule, CommonModule, Button, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent implements OnInit {
  @Input() post!: Post;
  @Input() imageUrl!: string;

  user!: DecodedToken | null;
  isEditable: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.isEditable = this.postService.canEdit(this.post.userId);
  }

  formatDate = () => formatBrDate(new Date(this.post.createdAt));

  editLink = () => `/post/${this.post.id}/edit`;
}
