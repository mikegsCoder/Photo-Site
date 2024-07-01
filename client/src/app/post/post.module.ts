import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostService } from './post.service';

import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';

import { SharedModule } from '../shared/shared.module';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  declarations: [
    CatalogComponent,
    ProfileComponent,
    CreateComponent,
    DetailComponent,
    EditComponent
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
