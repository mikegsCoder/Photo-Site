import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes = [
    {
        path: 'catalog',
        component: CatalogComponent,
        data: {
            // isLogged: true,
            title: 'ALL POSTS'
        }
    }
];

export const PostRoutingModule = RouterModule.forChild(routes);
