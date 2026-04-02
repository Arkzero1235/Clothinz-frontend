import { Component, Input } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-detail-breadcrumb',
  standalone: true,
  imports: [NzBreadCrumbModule, RouterModule],
  templateUrl: './product-detail-breadcrumb.html',
  styleUrl: './product-detail-breadcrumb.scss'
})
export class ProductDetailBreadcrumbComponent {
  @Input() productName: string = 'Product';
}
