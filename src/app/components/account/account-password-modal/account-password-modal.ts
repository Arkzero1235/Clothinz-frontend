import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-password-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './account-password-modal.html',
  styleUrl: './account-password-modal.scss'
})
export class AccountPasswordModalComponent {
  oldPassword = '';
  newPassword = '';
  isSubmitting = false;

  constructor(private modal: NzModalRef) {}

  submitForm(): void {
    if (!this.oldPassword || !this.newPassword) return;
    
    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.modal.destroy({ success: true });
    }, 1500);
  }

  close(): void {
    this.modal.destroy();
  }
}
