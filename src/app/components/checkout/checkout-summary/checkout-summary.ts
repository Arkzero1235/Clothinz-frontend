import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../services/cart.service';

@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-summary.html',
  styleUrl: './checkout-summary.scss'
})
export class CheckoutSummaryComponent {
  @Input() items: CartItem[] = [];
  @Input() subtotal: number = 0;
  @Input() shipping: number = 0;
  @Input() tax: number = 0;
  @Input() total: number = 0;
}
