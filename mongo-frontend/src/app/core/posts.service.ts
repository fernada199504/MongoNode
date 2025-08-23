import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: { _id: string; nombre: string };    // ✅ ahora reconoce author.name
  category: { _id: string; name: string };
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  list() {
    return this.http.get<Post[]>(`${this.base}/posts`);
  }

  create(data: Partial<Post>) {
    return this.http.post<Post>(`${this.base}/posts`, data);
  }
}