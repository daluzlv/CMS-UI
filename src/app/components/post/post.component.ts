import { Component, Input } from '@angular/core';

import { CardModule } from 'primeng/card';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CardModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() post!: Post;
  @Input() imageUrl!: string;

  formattedDate(): string {
    return new Date(this.post.createdAt).toLocaleDateString('pt-BR');
  }
}
