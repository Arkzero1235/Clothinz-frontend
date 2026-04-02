import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [RouterLink, NzButtonModule],
  templateUrl: './home-hero.html',
  styleUrl: './home-hero.scss'
})
export class HomeHeroComponent {}
