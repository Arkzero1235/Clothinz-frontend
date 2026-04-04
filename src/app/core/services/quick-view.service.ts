import { Injectable, signal } from '@angular/core';
import { Product } from '@core/models/product.model';

interface QuickViewState {
  isOpen: boolean;
  product: Product | null;
}

const DEFAULT_STATE: QuickViewState = {
  isOpen: false,
  product: null
};

@Injectable({
  providedIn: 'root'
})
export class QuickViewService {
  private state = signal<QuickViewState>(DEFAULT_STATE);
  
  readonly state$ = this.state.asReadonly();

  show(product: Product): void {
    this.state.set({
      isOpen: true,
      product
    });
  }

  close(): void {
    this.state.set(DEFAULT_STATE);
  }
}
