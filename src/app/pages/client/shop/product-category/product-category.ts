
import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from "@shared/components/navbar/navbar";
import { Breadcrumb } from "@shared/components/breadcrumb/breadcrumb";
import { ProductCard } from "@shared/components/product/product-card/product-card";
import { Pagination } from "@shared/components/pagination/pagination";
import Aos from 'aos';
import { Footer } from "@shared/components/footer/footer";
import { ProductApi } from '@core/api/product.api';
import { CategoryApi } from '@core/api/category.api';
import { Product } from '@core/models/product.model';
import { Category } from '@core/models/category.model';
import { CartStore } from '@core/cart/cart.store';
import { QuickViewService } from '@core/services/quick-view.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-category',
  imports: [
    Navbar,
    Breadcrumb,
    ProductCard,
    Pagination,
    Footer,
    TranslateModule
],
  templateUrl: './product-category.html',
  styleUrl: './product-category.css'
})
export class ProductCategory implements OnInit {
  private readonly productApi = inject(ProductApi);
  private readonly categoryApi = inject(CategoryApi);
  private readonly route = inject(ActivatedRoute);
  readonly cartStore = inject(CartStore);
  private readonly quickViewService = inject(QuickViewService);

  readonly productList = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly categoryId = signal<number | null>(null);
  readonly category = signal<Category | null>(null);
  readonly currentPage = signal(1);
  readonly limit = signal(20);
  readonly totalPages = signal(1);

  ngOnInit(): void {
    Aos.init();
    
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.categoryId.set(parseInt(id));
        this.currentPage.set(1);
        this.loadCategory();
        this.loadProducts();
      }
    });
  }

  private loadCategory(): void {
    const catId = this.categoryId();
    if (!catId) return;

    this.categoryApi.getAll().subscribe({
      next: (response) => {
        const sortedCategories = [...response.data.data].sort((a, b) => a.id - b.id);
        const found = sortedCategories.find(c => c.id === catId);
        if (found) {
          this.category.set(found);
        }
      },
      error: (err) => {
        console.error('Error loading category:', err);
      }
    });
  }

  private loadProducts(): void {
    const catId = this.categoryId();
    if (!catId) return;

    this.loading.set(true);
    
    this.productApi.getByCategory(catId, {
      page: this.currentPage(),
      limit: this.limit(),
      sort: 'name:asc'
    }).subscribe({
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
        this.productList.set(items);

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
        console.error('Error loading products:', err);
        this.loading.set(false);
      }
    });
  }

  onAddToCart(product: Product): void {
    this.cartStore.addToCart(product.id, 1);
  }

  handleQuickView(product: Product): void {
    this.quickViewService.show(product);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.currentPage.set(page);
      this.loadProducts();
    }
  }
}
