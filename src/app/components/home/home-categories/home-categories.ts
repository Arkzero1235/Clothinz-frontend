import { Component } from '@angular/core';
import { HomeBentoGridComponent } from './home-bento-grid/home-bento-grid';

@Component({
  selector: 'app-home-categories',
  standalone: true,
  imports: [HomeBentoGridComponent],
  templateUrl: './home-categories.html',
  styleUrl: './home-categories.scss'
})
export class HomeCategoriesComponent {}
