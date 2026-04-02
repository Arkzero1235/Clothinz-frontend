import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-account-danger-zone',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './account-danger-zone.html',
  styleUrl: './account-danger-zone.scss'
})
export class AccountDangerZoneComponent {}
