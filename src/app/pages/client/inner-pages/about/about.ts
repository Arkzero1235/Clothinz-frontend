import { Component, signal } from '@angular/core';
import { Navbar } from "@shared/components/navbar/navbar";
import { Breadcrumb } from "@shared/components/breadcrumb/breadcrumb";
import Aos from 'aos';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Footer } from "@shared/components/footer/footer";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [
    Navbar,
    Breadcrumb,
    CarouselModule,
    Footer,
    TranslateModule
],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  ngOnInit(): void {
    Aos.init()
  }

  open = signal(false);
  
  readonly feature = signal([
    {
      id: 1,
      image: 'assets/img/about/icon-1.png',
      titleKey: 'about.features.1.title',
      descKey: 'about.features.1.desc'
    },
    {
      id: 2,
      image: 'assets/img/about/icon-2.png',
      titleKey: 'about.features.2.title',
      descKey: 'about.features.2.desc'
    },
    {
      id: 3,
      image: 'assets/img/about/icon-3.png',
      titleKey: 'about.features.3.title',
      descKey: 'about.features.3.desc'
    },
    {
      id: 4,
      image: 'assets/img/about/icon-4.png',
      titleKey: 'about.features.4.title',
      descKey: 'about.features.4.desc'
    }
  ]);

  readonly customOptions = signal({
    loop: true,
    margin: 10,
    nav: false,
    items:1,
    dots:true
  });
}
