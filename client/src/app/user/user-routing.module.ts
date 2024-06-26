import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      isLogged: false,
      noNavigation: true,
      title: 'REGISTER USER'
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      isLogged: false,
      title: 'USER LOGIN'
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      isLogged: true,
      title: 'USER PROFILE'
    }
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);
