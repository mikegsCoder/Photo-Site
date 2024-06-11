import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { appInterceptorProvider } from './app.interceptor';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent
  ],
  imports: [
    CommonModule, 
    RouterModule
  ],
  providers: [
    appInterceptorProvider, 
    AuthService, 
    AuthGuard
  ],
  exports: [
    HeaderComponent, 
    FooterComponent
  ],
})
export class CoreModule {}
