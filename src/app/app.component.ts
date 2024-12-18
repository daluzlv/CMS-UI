import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { LayoutComponent } from "./components/layout/layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ToastModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
})
export class AppComponent {
  title = 'CMS-UI';
}
