import { Component, signal, input, computed } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { marked } from 'marked';

interface Review {
  nameKey: string;
  descKey: string;
}

interface ShippingInfo {
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-detail-tab',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './detail-tab.html',
  styleUrl: './detail-tab.css'
})
export class DetailTab {
  readonly description = input<string>('');
  readonly parsedDescription = computed(() => {
    return this.description() ? marked.parse(this.description()) : '';
  });
  readonly activeTab = signal(1);

  readonly detailReviewList = signal<Review[]>([
    {
      nameKey: 'product.reviews.1.name',
      descKey: 'product.reviews.1.desc'
    },
    {
      nameKey: 'product.reviews.2.name',
      descKey: 'product.reviews.2.desc'
    },
    {
      nameKey: 'product.reviews.3.name',
      descKey: 'product.reviews.3.desc'
    }
  ]);

  readonly shippingAboutList = signal<ShippingInfo[]>([
    {
      titleKey: 'product.shipping.1.title',
      descKey: 'product.shipping.1.desc'
    },
    {
      titleKey: 'product.shipping.2.title',
      descKey: 'product.shipping.2.desc'
    },
    {
      titleKey: 'product.shipping.3.title',
      descKey: 'product.shipping.3.desc'
    },
    {
      titleKey: 'product.shipping.4.title',
      descKey: 'product.shipping.4.desc'
    }
  ]);

  setActiveTab(tab: number) {
    this.activeTab.set(tab);
  }
}
