import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CartService } from '../../services/cart.service';
import { CheckoutStepperComponent, CheckoutStep } from '../../components/checkout/checkout-stepper/checkout-stepper';
import { CheckoutShippingFormComponent } from '../../components/checkout/checkout-shipping-form/checkout-shipping-form';
import { CheckoutPaymentFormComponent } from '../../components/checkout/checkout-payment-form/checkout-payment-form';
import { CheckoutSummaryComponent } from '../../components/checkout/checkout-summary/checkout-summary';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    NzButtonModule, 
    CheckoutStepperComponent,
    CheckoutShippingFormComponent,
    CheckoutPaymentFormComponent,
    CheckoutSummaryComponent
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class CheckoutComponent {
  private cartService = inject(CartService);

  step: CheckoutStep = 'shipping';
  
  items$ = this.cartService.items$;
  subtotal$ = this.cartService.subtotal$;
  
  shippingValue = 0;
  taxRate = 0.0875;

  shippingForm = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States'
  };

  paymentForm = {
    method: 'visa',
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  onStepChange(s: CheckoutStep): void {
    this.step = s;
    window.scrollTo(0, 0);
  }

  getTax(subtotal: number): number {
    return subtotal * this.taxRate;
  }

  getTotal(subtotal: number): number {
    return subtotal + this.shippingValue + this.getTax(subtotal);
  }

  placeOrder(): void {
    alert('Order Placed Successfully! Thank you for choosing Clothinz.');
    this.cartService.clearCart();
  }
}
