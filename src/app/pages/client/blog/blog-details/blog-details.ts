
import { Component, afterNextRender, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Navbar } from "@shared/components/navbar/navbar";
import Aos from 'aos';
import { BlogList } from "@shared/components/blog/blog";
import { Footer } from "@shared/components/footer/footer";
import { BlogApi } from '@core/api/blog.api';
import { Blog } from '@core/models/blog.model';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from '@shared/components/button/button';

interface Comments{
    image: string;
    name: string;
    decs: string;
}

interface ShareLink {
  icon: string;
  ariaLabel: string;
}

type AdjacentType = 'prev' | 'next';

interface AdjacentPost {
  type: AdjacentType;
  titleKey: string;
  blog: Blog;
}

@Component({
  selector: 'app-blog-details',
  imports: [
    RouterLink,
    Navbar,
    BlogList,
    Footer,
    DatePipe,
    TranslateModule,
    Button
],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css'
})
export class BlogDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogApi = inject(BlogApi);

  readonly blogTag = signal([]);
  readonly comments = signal<Comments[]>([]);
  readonly data = signal<Blog | null>(null);
  readonly id = signal<number>(0);
  readonly allBlogs = signal<Blog[]>([]);

  readonly shareLinks = signal<ShareLink[]>([
    { icon: 'fa-brands fa-facebook-f', ariaLabel: 'Facebook' },
    { icon: 'fa-brands fa-twitter', ariaLabel: 'Twitter' },
    { icon: 'fa-brands fa-instagram', ariaLabel: 'Instagram' }
  ]);

  readonly prevBlog = computed(() => {
    const currentId = this.id();
    const blogs = this.allBlogs();
    const currentIndex = blogs.findIndex(b => b.id === currentId);
    return currentIndex > 0 ? blogs[currentIndex - 1] : null;
  });

  readonly nextBlog = computed(() => {
    const currentId = this.id();
    const blogs = this.allBlogs();
    const currentIndex = blogs.findIndex(b => b.id === currentId);
    return currentIndex >= 0 && currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
  });

  readonly adjacentPosts = computed<AdjacentPost[]>(() => {
    const items: AdjacentPost[] = [];
    const prev = this.prevBlog();
    const next = this.nextBlog();

    if (prev) {
      items.push({ type: 'prev', titleKey: 'blog.prevPost', blog: prev });
    }
    if (next) {
      items.push({ type: 'next', titleKey: 'blog.nextPost', blog: next });
    }

    return items;
  });

  private readonly afterRender = afterNextRender(() => {
    Aos.init();
  });

  ngOnInit(): void {
    this.blogApi.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.allBlogs.set(response.data);
        }
      }
    });

    this.route.params.subscribe(params => {
      const blogId = Number(params['id']);
      
      if (isNaN(blogId) || blogId < 0) {
        this.router.navigate(['/error'], { skipLocationChange: true });
        return;
      }
      
      this.id.set(blogId);
      
      this.scrollToTop();
      
      this.blogApi.getById(blogId).subscribe({
        next: (response) => {
          if (response.success) {
            this.data.set(response.data);
          } else {
            this.router.navigate(['/error'], { skipLocationChange: true });
          }
        },
        error: (error) => {
          console.error('Error fetching blog:', error);
          this.router.navigate(['/error'], { skipLocationChange: true });
        }
      });
    });
  }
  
  private scrollToTop(): void {
    const scrollToTop = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScroll > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    };
    
    scrollToTop();
  }
}
