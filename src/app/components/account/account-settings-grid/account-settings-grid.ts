import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AccountPasswordModalComponent } from '../account-password-modal/account-password-modal';

@Component({
  selector: 'app-account-settings-grid',
  standalone: true,
  imports: [NzSwitchModule, NzButtonModule, NzModalModule, FormsModule],
  templateUrl: './account-settings-grid.html',
  styleUrl: './account-settings-grid.scss'
})
export class AccountSettingsGridComponent {
  @Input() mode: 'all' | 'notifications' | 'security' = 'all';
  @Input() orderUpdates: boolean = true;
  @Input() newsletter: boolean = false;
  @Output() orderUpdatesChange = new EventEmitter<boolean>();
  @Output() newsletterChange = new EventEmitter<boolean>();

  constructor(private modalService: NzModalService) {}

  openUpdatePasswordModal(): void {
    this.modalService.create({
      nzTitle: 'Update Security Password',
      nzContent: AccountPasswordModalComponent,
      nzFooter: null,
      nzWidth: 440,
      nzCentered: true,
      nzClassName: 'premium-modal'
    });
  }
}
