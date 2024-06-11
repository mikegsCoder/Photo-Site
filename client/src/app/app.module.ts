import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { HeaderComponent } from './core/header/header.component';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [
    AppComponent, 
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
  ],
})
export class AppModule {}
