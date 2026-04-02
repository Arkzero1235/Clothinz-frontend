import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, NzButtonModule, NzInputModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  searchQuery = '';
  isMenuOpen = false;
  
  private cartService = inject(CartService);
  totalItems$ = this.cartService.totalItems$;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
