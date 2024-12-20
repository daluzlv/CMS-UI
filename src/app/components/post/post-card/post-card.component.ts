import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CardModule } from 'primeng/card';

import { Post } from '../../../models/post.model';

import { formatBrDate } from '../../../utils/date';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() imageUrl!: string;

  formatDate = () => formatBrDate(new Date(this.post.createdAt));
}
