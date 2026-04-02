import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-trending',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-trending.html',
  styleUrl: './home-trending.scss'
})
export class HomeTrendingComponent {
  @Input() products: any[] = [];
}
