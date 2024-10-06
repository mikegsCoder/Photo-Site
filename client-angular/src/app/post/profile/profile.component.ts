import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  posts: IPost[];
  loading: boolean;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.postService.loadProfilePosts().subscribe((posts) => {
      this.posts = posts;
      this.loading = false;
    });
  }

  redirectHandler(id): void {
    this.router.navigate([`/post/detail/${id}`]);
  }
}
