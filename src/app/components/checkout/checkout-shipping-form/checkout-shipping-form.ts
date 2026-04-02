import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-checkout-shipping-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule, NzSelectModule, NzButtonModule],
  templateUrl: './checkout-shipping-form.html',
  styleUrl: './checkout-shipping-form.scss'
})
export class CheckoutShippingFormComponent {
  @Input() form: any = {};
  @Output() next = new EventEmitter<void>();

  selectedMethod: 'standard' | 'express' = 'standard';

  onNext(): void {
    this.next.emit();
  }
}
