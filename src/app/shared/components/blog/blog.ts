
import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogApi } from '@core/api/blog.api';
import { Blog } from '@core/models/blog.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    TranslateModule
  ],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogList implements OnInit {
  private readonly blogApi = inject(BlogApi);
  readonly blogList = signal<Blog[]>([]);

  ngOnInit(): void {
    this.blogApi.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.blogList.set(response.data.slice(0, 3));
        }
      }
    });
  }
}
