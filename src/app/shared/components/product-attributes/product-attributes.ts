import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface ProductAttribute {
  name: string;
  value: string;
}

@Component({
  selector: 'app-product-attributes',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './product-attributes.html'
})
export class ProductAttributesComponent {
  attributes = input<ProductAttribute[]>([]);
  size = input<'sm' | 'md'>('md');

  getDisplayAttributes(): ProductAttribute[] {
    return this.attributes().filter(a => a?.name?.trim() && a?.value?.toString().trim());
  }

  attributeValueClass() {
    const baseClass = 'text-title/70 dark:text-white/70 break-words';
    const sizeClass = this.size() === 'sm' ? 'text-xs' : 'text-sm';
    return `${baseClass} ${sizeClass}`;
  }
}
