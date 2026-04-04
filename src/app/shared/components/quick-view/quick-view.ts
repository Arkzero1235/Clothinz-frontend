import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QuickViewService } from '@core/services/quick-view.service';
import { CartStore } from '@core/cart/cart.store';
import { WishlistStore } from '@core/wishlist/wishlist.store';
import { AuthStore } from '@core/auth/auth.store';
import { ToastService } from '@core/services/toast.service';
import { IncDec } from '@shared/components/inc-dec/inc-dec';
import { ProductAttributes } from '@shared/components/product/product-attributes/product-attributes';
import { formatVND } from '@shared/utils';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quick-view',
  standalone: true,
  imports: [IncDec, TranslateModule, ProductAttributes],
  templateUrl: './quick-view.html',
  styleUrl: './quick-view.css'
})
export class QuickViewComponent {
  private readonly quickViewService = inject(QuickViewService);
  private readonly cartStore = inject(CartStore);
  private readonly wishlistStore = inject(WishlistStore);
  private readonly authStore = inject(AuthStore);
  private readonly toastService = inject(ToastService);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);

  readonly state = this.quickViewService.state$;
  readonly isAuthenticated = this.authStore.isAuthenticated;
  readonly wishlistItems = this.wishlistStore.items;
  
  readonly quantity = signal(1);
  readonly selectedAttributes = signal<Record<string, string>>({});

  readonly isInWishlist = computed(() => {
    const product = this.state().product;
    if (!product) return false;
    return this.wishlistItems().some(item => item.id === product.id);
  });

  readonly displayImages = computed(() => {
    const product = this.state().product;
    if (!product?.images || product.images.length <= 1) return [];
    return product.images.slice(1, 3);
  });

  readonly shortDescription = computed(() => {
    const desc = this.state().product?.description;
    if (!desc) return '';
    const firstSentence = desc.split('.')[0];
    return firstSentence ? firstSentence + '.' : desc.substring(0, 100) + '...';
  });

  close(): void {
    this.quickViewService.close();
    this.resetState();
  }

  closeOnBackdrop(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('quick-view-backdrop')) {
      this.close();
    }
  }

  private resetState(): void {
    this.quantity.set(1);
    this.selectedAttributes.set({});
  }

  onAttributeChange(event: { name: string; value: string }): void {
    this.selectedAttributes.update(attrs => ({
      ...attrs,
      [event.name]: event.value
    }));
  }

  toggleWishlist(): void {
    const product = this.state().product;
    if (!product) return;

    if (!this.isAuthenticated()) {
      this.toastService.warning(this.translate.instant('wishlist.loginToAdd'));
      this.router.navigate(['/auth/login']);
      return;
    }

    this.wishlistStore.toggleWishlist(product);
    
    if (this.isInWishlist()) {
      this.toastService.success(this.translate.instant('wishlist.added'));
    } else {
      this.toastService.info(this.translate.instant('wishlist.removed'));
    }
  }

  async addToCart(): Promise<void> {
    const product = this.state().product;
    if (!product) return;

    if (!this.isAuthenticated()) {
      this.close();
      this.toastService.warning(this.translate.instant('cart.loginToAdd'));
      this.router.navigate(['/auth/login']);
      return;
    }

    if (product.stock < 1) {
      this.toastService.error(this.translate.instant('product.outOfStockMessage'));
      return;
    }

    try {
      const attrs = this.selectedAttributes();
      const attributesArray = Object.keys(attrs).length > 0 
        ? Object.entries(attrs).map(([name, value]) => ({ name, value }))
        : undefined;
      await this.cartStore.addToCart(product.id, this.quantity(), attributesArray);
      this.toastService.success(this.translate.instant('product.addedToCart'));
      this.close();
    } catch (error) {
      this.toastService.error(this.translate.instant('product.addToCartFailed'));
    }
  }

  formatPrice(price: number): string {
    return formatVND(price);
  }

  viewFullDetails(): void {
    const product = this.state().product;
    if (!product) return;
    
    this.close();
    this.router.navigate(['/product-details', product.slug || product.id]);
  }
}
