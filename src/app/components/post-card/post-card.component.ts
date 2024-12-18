import { Component, Input } from '@angular/core';

import { CardModule } from 'primeng/card';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() imageUrl!: string;

  formattedDate(): string {
    return new Date(this.post.createdAt).toLocaleDateString('pt-BR');
  }
}
