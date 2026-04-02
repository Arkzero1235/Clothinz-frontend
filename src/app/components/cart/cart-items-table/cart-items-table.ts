import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { CartItem } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-items-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NzButtonModule, NzInputNumberModule],
  templateUrl: './cart-items-table.html',
  styleUrl: './cart-items-table.scss'
})
export class CartItemsTableComponent {
  @Input() items: CartItem[] = [];
  @Output() quantityChange = new EventEmitter<{id: number, quantity: number}>();
  @Output() remove = new EventEmitter<number>();

  onQuantityChange(id: number, quantity: number): void {
    this.quantityChange.emit({ id, quantity });
  }

  onRemove(id: number): void {
    this.remove.emit(id);
  }
}
