import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-account-order-history',
  standalone: true,
  imports: [CommonModule, NzTagModule],
  templateUrl: './account-order-history.html',
  styleUrl: './account-order-history.scss'
})
export class AccountOrderHistoryComponent {
  @Input() orders: any[] = [];
}
