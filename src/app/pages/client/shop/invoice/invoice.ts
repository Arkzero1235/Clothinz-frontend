
import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Switcher } from "@shared/components/switcher/switcher";
import { Order, OrderPreview } from '@core/models/order.model';
import { OrderApi } from '@core/api/order.api';
import { formatVND } from '@shared/utils';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Button } from "@shared/components/button/button";

@Component({
  selector: 'app-invoice',
  imports: [
    RouterLink,
    Switcher,
    CommonModule,
    TranslateModule,
    Button
],
  templateUrl: './invoice.html',
  styleUrl: './invoice.css'
})
export class Invoice implements OnInit {
  private orderApi = inject(OrderApi);
  private route = inject(ActivatedRoute);
  private translate = inject(TranslateService);

  order = signal<Order | null>(null);
  loading = signal(true);
  formatVND = formatVND;

  getDisplayAttributes(attributes?: Array<{ name: string; value: string }> | null): Array<{ name: string; value: string }> {
    if (!attributes?.length) return [];
    return attributes.filter(a => a?.name?.trim() && a?.value?.trim());
  }

  ngOnInit() {
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (orderId) {
      this.loadOrder(Number(orderId));
    }
  }

  loadOrder(orderId: number) {
    this.loading.set(true);
    this.orderApi.getById(orderId).subscribe({
      next: (response) => {
        this.order.set(response.data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load order:', error);
        this.loading.set(false);
      }
    });
  }

  getStatusLabel(status: string): string {
    const statusMap: Record<string, string> = {
      'PENDING': this.translate.instant('order.status.pending'),
      'PAID': this.translate.instant('order.status.paid'),
      'SHIPPED': this.translate.instant('order.status.shipped'),
      'CANCELLED': this.translate.instant('order.status.cancelled'),
      'COMPLETED': this.translate.instant('order.status.completed')
    };
    return statusMap[status] || status;
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  printInvoice() {
    window.print();
  }
}
