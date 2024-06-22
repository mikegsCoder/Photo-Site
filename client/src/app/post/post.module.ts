import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './post.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostRoutingModule } from './post-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    CatalogComponent,
      ProfileComponent,
      CreateComponent
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    PostRoutingModule,
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
