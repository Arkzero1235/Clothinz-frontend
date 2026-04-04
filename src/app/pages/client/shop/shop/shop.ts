import { Component, afterNextRender, signal, inject, effect, computed, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Navbar } from "@shared/components/navbar/navbar";
import { Breadcrumb } from "@shared/components/breadcrumb/breadcrumb";
import { Router } from '@angular/router';
import Aos from 'aos';
import { ProductCard } from "@shared/components/product/product-card/product-card";
import { Pagination } from "@shared/components/pagination/pagination";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Footer } from "@shared/components/footer/footer";
import { ProductApi } from '@core/api/product.api';
import { CategoryApi } from '@core/api/category.api';
import { Product } from '@core/models/product.model';
import { Category } from '@core/models/category.model';
import { formatVND } from '@shared/utils';
import { AuthStore } from '@core/auth/auth.store';
import { CartStore } from '@core/cart/cart.store';
import { QuickViewService } from '@core/services/quick-view.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shop',
  imports: [
    Navbar,
    Breadcrumb,
    ProductCard,
    Pagination,
    NgxSliderModule,
    Footer,
    TranslateModule
],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class ShopComponent {
  private readonly productApi = inject(ProductApi);
  private readonly categoryApi = inject(CategoryApi);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);
  readonly authStore = inject(AuthStore);
  readonly cartStore = inject(CartStore);
  private readonly quickViewService = inject(QuickViewService);
  private readonly priceChangeSubject = new Subject<void>();

  readonly value = signal(1000);
  readonly highValue = signal(10000000);
  
  readonly options = signal({
    floor: 1000,
    ceil: 10000000,
    step: 10000,
    translate: (value: number): string => {
      return this.formatVND(value) + '₫';
    }
  });

  readonly productList = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly currentPage = signal(1);
  readonly limit = signal(12);
  readonly totalPages = signal(1);
  readonly selectedCategories = signal<Set<number>>(new Set());
  readonly sortOption = signal<'price:ASC' | 'price:DESC' | 'name:ASC' | 'updatedAt:DESC' | 'updatedAt:ASC'>('updatedAt:DESC');
  readonly baselinePriceMin = signal<number | null>(null);
  readonly baselinePriceMax = signal<number | null>(null);
  
  readonly categories = signal<Category[]>([]);
  readonly loadingCategories = signal(true);
  readonly displayCategories = computed(() => this.categories().slice(0, 6));

  private readonly afterRender = afterNextRender(() => {
    Aos.init();
  });

  constructor() {
    this.loadCategories();
    
    this.priceChangeSubject.pipe(
      debounceTime(500),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.loadProducts();
    });
    
    effect((onCleanup) => {
      const _ = this.selectedCategories();
      const __ = this.sortOption();
      const ___ = this.currentPage();
      
      const timer = setTimeout(() => this.loadProducts(), 0);
      onCleanup(() => clearTimeout(timer));
    });
    
    effect(() => {
      const min = this.value();
      const max = this.highValue();

      if (this.baselinePriceMin() === null || this.baselinePriceMax() === null) {
        this.baselinePriceMin.set(min);
        this.baselinePriceMax.set(max);
        return;
      }

      this.priceChangeSubject.next();
    });
  }

  private loadCategories(): void {
    this.loadingCategories.set(true);
    this.categoryApi.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.categories.set([...response.data.data].sort((a, b) => a.id - b.id));
        this.loadingCategories.set(false);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.loadingCategories.set(false);
      }
    });
  }

  private loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);

    const selectedCats = this.selectedCategories();
    const categoryId = selectedCats.size > 0 ? Array.from(selectedCats)[0] : undefined;

    const apiCall = categoryId 
      ? this.productApi.getByCategory(categoryId, {
          page: this.currentPage(),
          limit: this.limit(),
          sort: this.sortOption()
        })
      : this.productApi.getAll({
          page: this.currentPage(),
          limit: this.limit(),
          sort: this.sortOption()
        });

    apiCall.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        const payload = response.data as {
          data?: Product[];
          results?: Product[];
          total?: number;
          limit?: number;
          totalPages?: number;
          meta?: {
            total?: number;
            limit?: number;
            totalPages?: number;
          };
        };

        const items = payload.data ?? payload.results ?? [];
        const minPrice = this.value();
        const maxPrice = this.highValue();
        const priceOptions = this.options();
        const tolerance = priceOptions.step ?? 0;
        const baselineMin = this.baselinePriceMin() ?? minPrice;
        const baselineMax = this.baselinePriceMax() ?? maxPrice;
        const shouldApplyPriceFilter =
          Math.abs(minPrice - baselineMin) > tolerance ||
          Math.abs(maxPrice - baselineMax) > tolerance;
        const filteredProducts = shouldApplyPriceFilter
          ? items.filter(product => product.price >= minPrice && product.price <= maxPrice)
          : items;

        this.productList.set(filteredProducts);

        const totalPagesFromMeta = payload.meta?.totalPages;
        const totalPagesFromRoot = payload.totalPages;
        const totalFromMeta = payload.meta?.total;
        const totalFromRoot = payload.total;
        const effectiveLimit = payload.meta?.limit ?? payload.limit ?? this.limit();

        const calculatedTotalPages =
          totalPagesFromMeta ??
          totalPagesFromRoot ??
          (typeof totalFromMeta === 'number' ? Math.ceil(totalFromMeta / effectiveLimit) : undefined) ??
          (typeof totalFromRoot === 'number' ? Math.ceil(totalFromRoot / effectiveLimit) : 1);

        this.totalPages.set(Math.max(1, calculatedTotalPages));

        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.translate.instant('shop.errors.loadProducts'));
        console.error('Error loading products:', err);
        this.loading.set(false);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  toggleCategory(categoryId: number): void {
    this.selectedCategories.update(cats => {
      const newCats = new Set(cats);
      if (newCats.has(categoryId)) {
        newCats.delete(categoryId);
      } else {
        newCats.clear(); // Only allow single category selection
        newCats.add(categoryId);
      }
      return newCats;
    });
    this.currentPage.set(1);
  }

  isCategorySelected(categoryId: number): boolean {
    return this.selectedCategories().has(categoryId);
  }

  setSortOption(sort: 'price:ASC' | 'price:DESC' | 'name:ASC' | 'updatedAt:DESC' | 'updatedAt:ASC'): void {
    this.sortOption.set(sort);
    this.currentPage.set(1);
  }

  readonly isopen = signal(false);
  readonly sortOptions = signal([
    { labelKey: 'shop.sort.dateNewest', value: 'updatedAt:DESC' as const },
    { labelKey: 'shop.sort.dateOldest', value: 'updatedAt:ASC' as const },
    { labelKey: 'shop.sort.priceLowHigh', value: 'price:ASC' as const },
    { labelKey: 'shop.sort.priceHighLow', value: 'price:DESC' as const },
    { labelKey: 'shop.sort.nameAToZ', value: 'name:ASC' as const }
  ]);
  
  readonly selectedSortLabelKey = computed(() => {
    const current = this.sortOption();
    const option = this.sortOptions().find(opt => opt.value === current);
    return option?.labelKey || 'shop.sort.dateNewest';
  });
  
  toggleDropdown() {
    this.isopen.update(v => !v);
  }
  
  handleSortSelect(sortValue: 'price:ASC' | 'price:DESC' | 'name:ASC' | 'updatedAt:DESC' | 'updatedAt:ASC', event: Event) {
    event.stopPropagation();
    this.isopen.set(false);
    this.setSortOption(sortValue);
  }

  onAddToCart(product: Product): void {
    this.cartStore.addToCart(product.id, 1);
  }

  handleQuickView(product: Product): void {
    this.quickViewService.show(product);
  }

  readonly formatVND = formatVND;

}
