import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './status-badge.html'
})
export class StatusBadgeComponent {
  status = input.required<OrderStatus | string>();
  size = input<'xs' | 'sm' | 'md'>('sm');

  badgeClass() {
    const sizeMap = {
      xs: 'px-2 py-0.5 text-xs',
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-1.5 text-base'
    };

    const sizeClass = sizeMap[this.size()];
    const colorClass = this.getStatusColor();
    
    return `inline-flex items-center justify-center rounded-full text-white font-medium ${sizeClass} ${colorClass}`;
  }

  getStatusColor(): string {
    const status = this.status().toUpperCase();
    
    switch (status) {
      case 'PENDING':
        return 'bg-[#EC991D]';
      case 'PAID':
        return 'bg-[#60A5FA]';
      case 'PROCESSING':
        return 'bg-[#3B82F6]';
      case 'SHIPPED':
        return 'bg-[#8B5CF6]';
      case 'COMPLETED':
        return 'bg-[#31A051]';
      case 'CANCELLED':
        return 'bg-[#E13939]';
      default:
        return 'bg-gray-500';
    }
  }
}
