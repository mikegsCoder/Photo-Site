import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

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
];

export const UserRoutingModule = RouterModule.forChild(routes);
