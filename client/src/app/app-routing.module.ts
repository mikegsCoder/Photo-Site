import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home',
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'HOME',
        },
      },
      {
        path: 'user',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'post',
        loadChildren: () => import('./post/post.module').then(m => m.PostModule)
      },
      {
        path: '**',
        component: NotFoundComponent,
        data: {
          title: '404',
        },
      },
    ],
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
