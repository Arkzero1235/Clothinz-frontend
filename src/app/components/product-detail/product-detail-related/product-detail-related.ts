import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-product-detail-related',
  standalone: true,
  imports: [RouterLink, NzButtonModule],
  templateUrl: './product-detail-related.html',
  styleUrl: './product-detail-related.scss'
})
export class ProductDetailRelatedComponent {
  @Input() related: any[] = [];
}
