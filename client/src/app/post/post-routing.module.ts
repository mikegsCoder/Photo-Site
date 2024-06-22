import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
    data: {
      // isLogged: true,
      title: 'ALL POSTS',
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
        isLogged: true,
        title: 'PROFILE POSTS'
    }
  },
  {
    path: 'create',
    component: CreateComponent,
    data: {
      isLogged: true,
      title: 'CREATE POST',
    },
  },
];

export const PostRoutingModule = RouterModule.forChild(routes);
