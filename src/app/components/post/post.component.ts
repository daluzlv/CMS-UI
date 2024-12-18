import { Component, Input } from '@angular/core';

import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CardModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() title!: string;
  @Input() fullName!: string;
  @Input() date!: string;
  @Input() imageUrl!: string;
  @Input() content!: string;
}
