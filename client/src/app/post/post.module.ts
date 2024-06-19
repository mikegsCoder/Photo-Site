import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './post.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    SharedModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
})
export class PostModule {
  static forRoot(): ModuleWithProviders<PostModule> {
    return {
      ngModule: PostModule,
      providers: [PostService],
    };
  }
}
