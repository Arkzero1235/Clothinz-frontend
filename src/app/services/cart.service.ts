import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  ref?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([
    // Initial mock data for demonstration
    {
      id: 1,
      name: "L'Eau de Minimaliste",
      price: 185,
      quantity: 1,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2oJxsTPlNwlKqW16yNPTsJToNZ-DcGRdcxYqc6TjoTWM5CVLn_om5kEcVM4FygHDFFkRNbr0BJf_bL3z-ZsysC2YOj4NOHKPJbHppRa1oZDMFoqVXn11wwEvLDPnu1upxBnebFYSUYPhkfvYFAxsJLFHcBUEmsV-dnFBnaMyFjjOLQryy_TV_AdGYyyhgWWfWzS45HnOQ15nX-2unZ-ymbGidfjb62cKWerRzFP_IfqYZTUiNjF0WJJ5avujCf3qFUuE54prEvIHd",
      size: "100ml",
      ref: "0942-A"
    },
    {
      id: 2,
      name: "Aviator Eclipse",
      price: 320,
      quantity: 1,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqwF6ns-T-GBJSv-02pMvlWsrNI0jjftgq5x_JFq_Nso-NqQun40lbHZZaUdAUi9Hup-cmM9BaqQlUuUPZsRloyykxAVGu4BW88a2S3apQ9BJ4hN2OHht0x8mxCeUFhI0phqOhzJW5T2HsSDBVrx6HlpX2JBTjlESylqqT5mCfLYk0MTXY6EIjHEXg90R311TsBk9Luvy4Ki3_X6vLz0g8nN_Zf12wSKpASjvcr7vHPimsukX_xaLcxQ6V6tqY2AOCsYtFbgxGto9Z",
      color: "Midnight Gold",
      ref: "1205-X"
    }
  ]);

  items$ = this.itemsSubject.asObservable();
  
  subtotal$ = this.items$.pipe(
    map(items => items.reduce((acc, item) => acc + (item.price * item.quantity), 0))
  );

  totalItems$ = this.items$.pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  addToCart(item: CartItem): void {
    const currentItems = this.itemsSubject.value;
    const existingItem = currentItems.find(i => i.id === item.id && i.size === item.size && i.color === item.color);

    if (existingItem) {
      existingItem.quantity += item.quantity;
      this.itemsSubject.next([...currentItems]);
    } else {
      this.itemsSubject.next([...currentItems, item]);
    }
  }

  updateQuantity(id: number, quantity: number): void {
    const currentItems = this.itemsSubject.value;
    const item = currentItems.find(i => i.id === id);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.itemsSubject.next([...currentItems]);
    }
  }

  removeFromCart(id: number): void {
    const currentItems = this.itemsSubject.value;
    this.itemsSubject.next(currentItems.filter(i => i.id !== id));
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }
}
