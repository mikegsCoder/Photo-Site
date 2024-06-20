import { Component, OnInit } from '@angular/core';
import { IPost } from '../../shared/interfaces';
import { PostService } from '../post.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  posts: IPost[];
  loading = true;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loading = true;
    this.postService.loadAllPosts().subscribe((posts) => {
      this.posts = posts;
      this.loading = false;
    });
  }
}
