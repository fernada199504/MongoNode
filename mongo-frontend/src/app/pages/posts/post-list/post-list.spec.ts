import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService, Post } from '../../../core/posts.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.html',
  styleUrls: ['./post-list.css']
})
export class PostList {
  private postsSvc = inject(PostsService);
  posts: Post[] = [];
  error = '';
  isLoading = false;

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.postsSvc.list().subscribe({
      next: (data) => {
        this.posts = data;
        this.error = '';
        this.isLoading = false;
      },
      error: (e) => {
        this.error = e?.error?.message || 'Error cargando publicaciones';
        this.isLoading = false;
      }
    });
  }
}