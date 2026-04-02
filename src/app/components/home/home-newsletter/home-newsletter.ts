import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-home-newsletter',
  standalone: true,
  imports: [FormsModule, NzInputModule, NzButtonModule],
  templateUrl: './home-newsletter.html',
  styleUrl: './home-newsletter.scss'
})
export class HomeNewsletterComponent {
  @Input() newsletterEmail = '';
  @Output() newsletterEmailChange = new EventEmitter<string>();
}
