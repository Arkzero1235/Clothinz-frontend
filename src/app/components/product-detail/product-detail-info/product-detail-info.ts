import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-product-detail-info',
  standalone: true,
  imports: [NzButtonModule, NzTagModule, NzDividerModule, UpperCasePipe],
  templateUrl: './product-detail-info.html',
  styleUrl: './product-detail-info.scss'
})
export class ProductDetailInfoComponent {
  @Input() selectedColor = 'ivory';
  @Output() selectedColorChange = new EventEmitter<string>();

  @Input() selectedSize = 'S';
  @Output() selectedSizeChange = new EventEmitter<string>();

  @Input() colors: {id: string; hex: string}[] = [];
  @Input() sizes: string[] = [];

  selectColor(id: string) {
    this.selectedColor = id;
    this.selectedColorChange.emit(id);
  }

  selectSize(s: string) {
    this.selectedSize = s;
    this.selectedSizeChange.emit(s);
  }

  getSelectedColorName() {
    return this.selectedColor || 'Select';
  }
}
