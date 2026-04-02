import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-collections-products-area',
  standalone: true,
  imports: [FormsModule, RouterLink, NzSelectModule, NzPaginationModule, NzButtonModule],
  templateUrl: './collections-products-area.html',
  styleUrl: './collections-products-area.scss'
})
export class CollectionsProductsAreaComponent {
  @Input() products: any[] = [];
  @Input() sortBy = 'new';
  @Output() sortByChange = new EventEmitter<string>();
  @Input() currentPage = 1;
  @Output() currentPageChange = new EventEmitter<number>();
}
