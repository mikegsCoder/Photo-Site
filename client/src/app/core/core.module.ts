import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { appInterceptorProvider } from './app.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  providers: [appInterceptorProvider],
  exports: [],
})
export class CoreModule {}
