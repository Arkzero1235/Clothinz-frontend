import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './api-url';
import { ApiResponse } from '@core/models/api.response';
import { Blog } from '@core/models/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogApi {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponse<Blog[]>> {
    return this.http.get<ApiResponse<Blog[]>>(`${API_URL}/blogs`);
  }

  getById(id: number): Observable<ApiResponse<Blog>> {
    return this.http.get<ApiResponse<Blog>>(`${API_URL}/blogs/${id}`);
  }
}
