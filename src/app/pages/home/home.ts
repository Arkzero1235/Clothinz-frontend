import { Component } from '@angular/core';
import { HomeHeroComponent } from '../../components/home/home-hero/home-hero';
import { HomeCategoriesComponent } from '../../components/home/home-categories/home-categories';
import { HomeTrendingComponent } from '../../components/home/home-trending/home-trending';
import { HomeTestimonialsComponent } from '../../components/home/home-testimonials/home-testimonials';
import { HomeNewsletterComponent } from '../../components/home/home-newsletter/home-newsletter';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    HomeHeroComponent,
    HomeCategoriesComponent,
    HomeTrendingComponent,
    HomeTestimonialsComponent,
    HomeNewsletterComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  newsletterEmail = '';

  products = [
    {
      id: 1, category: 'Audio', name: 'Acoustic Pro One', price: '$299.00', isNew: false,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 2, category: 'Footwear', name: 'Velocity Run V3', price: '$165.00', isNew: false,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 3, category: 'Photography', name: 'Optic Classic 35mm', price: '$450.00', isNew: false,
      image: 'https://images.unsplash.com/photo-1526170315870-ef6856fd3afd?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 4, category: 'Audio', name: 'Gold Series Studio', price: '$599.00', isNew: true,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'
    }
  ];
}
