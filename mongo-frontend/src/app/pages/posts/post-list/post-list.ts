


import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService, Post } from '../../../core/posts.service'; // ajusta nombre si usaste posts.ts

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css'
})
export class PostList {
  private postsSvc = inject(PostsService);
  posts: Post[] = [];
  error = '';
  isLoading = false; 

  ngOnInit() { this.load(); }

  load() {
    this.postsSvc.list().subscribe({
      next: (data) => this.posts = data,
      error: (e) => this.error = e?.error?.message || 'Error cargando posts'
    });
  }
}
