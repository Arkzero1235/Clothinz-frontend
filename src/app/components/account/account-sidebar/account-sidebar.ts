import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-sidebar.html',
  styleUrl: './account-sidebar.scss'
})
export class AccountSidebarComponent {
  @Input() active: string = 'profile';
  @Output() activeChange = new EventEmitter<string>();

  onSectionChange(section: string) {
    this.activeChange.emit(section);
  }
}
