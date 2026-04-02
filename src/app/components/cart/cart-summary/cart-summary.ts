import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, RouterLink, NzButtonModule],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.scss'
})
export class CartSummaryComponent {
  @Input() subtotal: number = 0;
  @Input() shipping: number = 0;
  @Input() tax: number = 0;
  @Input() total: number = 0;
}
