import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="scroll-to-top" 
      [class.show]="isVisible" 
      (click)="scrollToTop()"
      aria-label="Scroll to top"
    >
      <span class="material-symbols-outlined">north</span>
    </button>
  `,
  styleUrl: './scroll-to-top.scss'
})
export class ScrollToTopComponent {
  isVisible = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
