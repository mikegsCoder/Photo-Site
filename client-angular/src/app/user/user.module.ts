import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from './user.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    ProfileComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
