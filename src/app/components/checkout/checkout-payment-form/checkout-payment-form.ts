import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-checkout-payment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule, NzButtonModule],
  templateUrl: './checkout-payment-form.html',
  styleUrl: './checkout-payment-form.scss'
})
export class CheckoutPaymentFormComponent {
  @Input() form: any = {};
  @Output() next = new EventEmitter<void>();

  onNext(): void {
    this.next.emit();
  }
}
