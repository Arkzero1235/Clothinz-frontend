import { Component, input, output, computed } from '@angular/core';
import { ProductAttribute } from '@core/models/product.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-attributes',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-attributes.html',
  styleUrl: './product-attributes.css'
})
export class ProductAttributes {
  readonly attributes = input<ProductAttribute[]>([]);
  readonly selectedAttributes = input<Record<string, string>>({});
  readonly attributeChange = output<{ name: string; value: string }>();

  readonly displayAttributes = computed(() =>
    this.attributes().filter(a => a?.name?.trim() && Array.isArray(a.values) && a.values.length > 0)
  );

  selectAttribute(name: string, value: string): void {
    this.attributeChange.emit({ name, value });
  }

  isSelected(name: string, value: string): boolean {
    return this.selectedAttributes()[name] === value;
  }
}
