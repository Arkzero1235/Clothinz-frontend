import { Component } from '@angular/core';
import { AccountSidebarComponent } from '../../components/account/account-sidebar/account-sidebar';
import { AccountInfoCardComponent } from '../../components/account/account-info-card/account-info-card';
import { AccountOrderHistoryComponent } from '../../components/account/account-order-history/account-order-history';
import { AccountSettingsGridComponent } from '../../components/account/account-settings-grid/account-settings-grid';
import { AccountDangerZoneComponent } from '../../components/account/account-danger-zone/account-danger-zone';

type Section = 'profile' | 'orders' | 'notifications' | 'security';

@Component({
  standalone: true,
  selector: 'app-account',
  imports: [
    AccountSidebarComponent,
    AccountInfoCardComponent,
    AccountOrderHistoryComponent,
    AccountSettingsGridComponent,
    AccountDangerZoneComponent
  ],
  templateUrl: './account.html',
  styleUrl: './account.scss'
})
export class AccountComponent {
  active: Section = 'profile';
  orderUpdates = true;
  newsletter = false;

  orders = [
    {
      id: '#AT-88210', name: 'Merino Wool Overcoat',
      date: 'Oct 12, 2023', status: 'Delivered', color: 'success', price: '$495.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtzdKDBflVU-A8L5LmkXb0QPOXkwSbCeDdtoiWu07PMODL3m5aN5T4_erOxDEGHUFQqH4qh-SEm5ebegXvEAYXthbu7MQMRE7_hCAAn9rspIYeOQUX7YQVf4St3g5Oy-woXGBXVaRCbiiCBE--1l0AYH3E-eMIEAWfuSXnN75OYm7ymvFvCnlHdAup9oRe1qOplpRXZ52UPNXsmWfx4kg4ssxzFTQ8n5k2h59C9vbarCBRI9ibLHHo9OJBLGZi8LIManqBbm_dEuo'
    },
    {
      id: '#AT-87902', name: 'Architect Series Watch',
      date: 'Sep 28, 2023', status: 'In Transit', color: 'processing', price: '$280.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW1i_8xYd1ZLlL2QmEoA8G2XBW1Y5Z4T9bVd9ieXrSAdDhcRhbcSyoa_yzQZ9QtH4VHV9XhNn8q785ichpZtgOVn95aiMILb82LC1Z5vQd56YpCetovpwaTSwdc0QXU25qrs11QhlHQb8BH4nNkD5virlYqJqfpPc7Oeomo6-uQNyHcRhJ2TgLdVh8NfBd9BcHa-6buMaXOQQCQIFgheZ4yBFgowNeDgT1g2XWOEkRn_v6zASrCmx8NczkdAWa2q4lYWshsiXbAnQ'
    },
  ];
}
