
import { Component, afterNextRender, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Navbar } from "@shared/components/navbar/navbar";
import { Breadcrumb } from "@shared/components/breadcrumb/breadcrumb";
import Aos from 'aos';
import { Footer } from "@shared/components/footer/footer";
import { BlogApi } from '@core/api/blog.api';
import { Blog } from '@core/models/blog.model';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from '@shared/components/button/button';

@Component({
  selector: 'app-blog',
  imports: [
    RouterLink,
    Navbar,
    Breadcrumb,
    Footer,
    DatePipe,
    TranslateModule,
    Button
],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent implements OnInit {
  private readonly blogApi = inject(BlogApi);
  private readonly afterRender = afterNextRender(() => {
    Aos.init();
  });

  readonly blogs = signal<Blog[]>([]);
  readonly showAll = signal(false);

  readonly featuredBlogs = computed(() => this.blogs().slice(0, 3));

  readonly latestBlogs = computed(() => {
    const rest = this.blogs().slice(3);
    return this.showAll() ? rest : rest.slice(0, 8);
  });

  readonly canLoadMore = computed(() => {
    const rest = this.blogs().slice(3);
    return !this.showAll() && rest.length > 8;
  });

  ngOnInit(): void {
    this.blogApi.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.blogs.set(response.data);
        }
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
      }
    });
  }

  loadMore(): void {
    this.showAll.set(true);
  }
}
