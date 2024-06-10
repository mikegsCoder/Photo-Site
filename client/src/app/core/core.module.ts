import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { appInterceptorProvider } from './app.interceptor';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  providers: [appInterceptorProvider, AuthService, AuthGuard],
  exports: [],
})
export class CoreModule {}
