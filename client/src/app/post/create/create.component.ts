import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { imageValidator } from '../../shared/validators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  form: FormGroup;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    const passwordControl = this.fb.control('', [
      Validators.required,
      Validators.minLength(4),
    ]);
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      keyword: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', [Validators.required, Validators.maxLength(15)]],
      date: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      imageUrl: ['', [Validators.required, imageValidator]],
      description: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submitHandler(): void {
    const data = this.form.value;
    this.isLoading = true;

    this.postService.createPost(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert(err.error.message);
      },
    });
  }
}
