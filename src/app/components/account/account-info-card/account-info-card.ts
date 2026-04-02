import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-account-info-card',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './account-info-card.html',
  styleUrl: './account-info-card.scss'
})
export class AccountInfoCardComponent {}
