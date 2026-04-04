import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import blogData from '@data/blog.json';
import { ApiResponse } from '@core/models/api.response';
import { Blog } from '@core/models/blog.model';

export const mockBlogInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/api/blogs')) {
    if (req.method === 'GET' && req.url.endsWith('/api/blogs')) {
      const response: ApiResponse<Blog[]> = {
        success: true,
        statusCode: 200,
        message: 'Blogs retrieved successfully',
        data: blogData as Blog[]
      };
      
      return of(new HttpResponse({ 
        status: 200, 
        body: response 
      }));
    }
    
    if (req.method === 'GET' && req.url.match(/\/api\/blogs\/\d+$/)) {
      const idMatch = req.url.match(/\/api\/blogs\/(\d+)$/);
      if (idMatch) {
        const id = parseInt(idMatch[1]);
        const blog = (blogData as Blog[]).find(b => b.id === id);
        
        if (blog) {
          const response: ApiResponse<Blog> = {
            success: true,
            statusCode: 200,
            message: 'Blog retrieved successfully',
            data: blog
          };
          
          return of(new HttpResponse({ 
            status: 200, 
            body: response 
          }));
        } else {
          const errorResponse: ApiResponse<Blog> = {
            success: false,
            statusCode: 404,
            message: 'Blog not found',
            data: null as any
          };
          
          return of(new HttpResponse({ 
            status: 404, 
            body: errorResponse 
          }));
        }
      }
    }
  }
  
  return next(req);
};
