import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { appInterceptorProvider } from './app.interceptor';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  providers: [appInterceptorProvider, AuthService],
  exports: [],
})
export class CoreModule {}
