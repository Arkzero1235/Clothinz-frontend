import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

import { QuickViewComponent } from './quick-view';
import { QuickViewService } from '@core/services/quick-view.service';
import { CartStore } from '@core/cart/cart.store';
import { WishlistStore } from '@core/wishlist/wishlist.store';
import { AuthStore } from '@core/auth/auth.store';
import { ToastService } from '@core/services/toast.service';

describe('QuickViewComponent', () => {
  let component: QuickViewComponent;
  let fixture: ComponentFixture<QuickViewComponent>;

  beforeEach(async () => {
    const quickViewState = signal({ isOpen: false, product: null });

    await TestBed.configureTestingModule({
      imports: [QuickViewComponent],
      providers: [
        {
          provide: QuickViewService,
          useValue: {
            state$: quickViewState.asReadonly(),
            close: vi.fn()
          }
        },
        {
          provide: CartStore,
          useValue: { addToCart: vi.fn().mockResolvedValue(undefined) }
        },
        {
          provide: WishlistStore,
          useValue: { items: signal([]), toggleWishlist: vi.fn() }
        },
        {
          provide: AuthStore,
          useValue: { isAuthenticated: signal(false) }
        },
        {
          provide: ToastService,
          useValue: {
            success: vi.fn(),
            error: vi.fn(),
            warning: vi.fn(),
            info: vi.fn()
          }
        },
        {
          provide: Router,
          useValue: { navigate: vi.fn() }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuickViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
