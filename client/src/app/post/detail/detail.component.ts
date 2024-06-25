import { Component } from '@angular/core';
import { IPost, IUser } from '../../shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  post: IPost = null;
  user: IUser = null;

  isVoted: boolean;
  loading: boolean;

  currentUser$ = this.authService.currentUser$;
  isLogged$ = this.authService.isLogged$;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;

    const id = this.activatedRoute.snapshot.params['id'];
    this.postService.loadPost(id).subscribe((post) => {
      this.post = post;
      this.isVoted = post.votes.find((u) => u._id == this.user?._id) != null;
      this.loading = false;
    });

    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.isVoted = this.post.votes.find((u) => u._id == user._id) != null;
    });
  }

  deleteHandler(): void {
    if (window.confirm('Are sure you want to delete this post?')) {
      this.postService
        .deletePost(this.post._id)
        .subscribe(() => this.router.navigate(['/']));
    }
  }

  votePositiveHandler(): void {}

  voteNegativeHandler(): void {}
}
