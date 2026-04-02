import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollToTopComponent],
  template: `
    <app-navbar />
    <main class="main-content">
      <router-outlet />
    </main>
    <app-footer />
    <app-scroll-to-top />
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 80px); /* Adjust based on navbar height */
    }
  `]
})
export class App {}
