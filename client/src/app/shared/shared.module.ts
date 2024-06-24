import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ShortenTextPipe } from './shorten-text.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    ShortenTextPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    ShortenTextPipe
  ],
})
export class SharedModule {}
