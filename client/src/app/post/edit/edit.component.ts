import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { imageValidator } from '../../shared/validators';
import { IPost } from '../../shared/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  post: IPost = null;
  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const passwordControl = this.fb.control('', [Validators.required, Validators.minLength(4)]);
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      keyword: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', [Validators.required, Validators.maxLength(15)]],
      date: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      imageUrl: ['', [Validators.required, imageValidator]],
      description: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.postService.loadPost(id).subscribe(post => {
      this.post = post;
    });
  }

  submitHandler(): void {
    const data = this.form.value;
    this.isLoading = true;

    this.postService.updatePost(this.post._id, data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate([`/post/detail/${this.post._id}`]);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert(err.error.message);
      }
    });
  }
}
