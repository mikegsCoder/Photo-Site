import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ShortenTextPipe } from './shorten-text.pipe';
import { TimeDiffPipe } from './time-diff.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    ShortenTextPipe,
    TimeDiffPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    ShortenTextPipe,
    TimeDiffPipe
  ],
})
export class SharedModule {}
