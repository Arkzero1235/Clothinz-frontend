import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CheckoutStep = 'shipping' | 'payment' | 'review';

@Component({
  selector: 'app-checkout-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-stepper.html',
  styleUrl: './checkout-stepper.scss'
})
export class CheckoutStepperComponent {
  @Input() activeStep: CheckoutStep = 'shipping';
  @Output() stepChange = new EventEmitter<CheckoutStep>();

  setStep(step: CheckoutStep): void {
    if (this.canNavigateTo(step)) {
      this.stepChange.emit(step);
    }
  }

  canNavigateTo(step: CheckoutStep): boolean {
    if (step === 'shipping') return true;
    if (step === 'payment' && this.activeStep !== 'shipping') return true;
    if (step === 'review' && this.activeStep === 'review') return true;
    
    // For simplicity in this demo, allow clicking back
    const steps: CheckoutStep[] = ['shipping', 'payment', 'review'];
    return steps.indexOf(step) <= steps.indexOf(this.activeStep);
  }
}
