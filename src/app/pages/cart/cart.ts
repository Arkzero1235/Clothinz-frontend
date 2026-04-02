import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CartService } from '../../services/cart.service';
import { CartItemsTableComponent } from '../../components/cart/cart-items-table/cart-items-table';
import { CartSummaryComponent } from '../../components/cart/cart-summary/cart-summary';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, NzButtonModule, CartItemsTableComponent, CartSummaryComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent {
  private cartService = inject(CartService);

  items$ = this.cartService.items$;
  subtotal$ = this.cartService.subtotal$;
  
  shipping = 0; 
  taxRate = 0.0875;

  onQuantityChange(event: {id: number, quantity: number}): void {
    this.cartService.updateQuantity(event.id, event.quantity);
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
  }

  getTax(subtotal: number): number {
    return subtotal * this.taxRate;
  }

  getTotal(subtotal: number): number {
    return subtotal + this.shipping + this.getTax(subtotal);
  }
}
