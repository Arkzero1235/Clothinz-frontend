import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'app-collections-filter-sidebar',
  standalone: true,
  imports: [FormsModule, NzCheckboxModule, NzSliderModule, NzRadioModule],
  templateUrl: './collections-filter-sidebar.html',
  styleUrl: './collections-filter-sidebar.scss'
})
export class CollectionsFilterSidebarComponent {
  @Input() categories: { label: string, checked: boolean }[] = [];
  @Output() categoriesChange = new EventEmitter<{ label: string, checked: boolean }[]>();

  @Input() priceRange = 1250;
  @Output() priceRangeChange = new EventEmitter<number>();

  @Input() selectedBrand = 'clothinz';
  @Output() selectedBrandChange = new EventEmitter<string>();

  isExpanded = false;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  onCategoryChange(cat: { label: string, checked: boolean }, value: boolean) {
    cat.checked = value;
    this.categoriesChange.emit(this.categories);
  }
}
