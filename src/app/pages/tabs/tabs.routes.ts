import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'home/:did',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'home/:did/post/:uri',
        loadComponent: () =>
          import('../post-view/post-view.page').then((m) => m.PostViewPage),
      },


      {
        path: 'notifications',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },

      //Profile tab
      {
        path: 'profile/:did',
        loadComponent: () => import('../tab3/tab3.page').then((m) => m.Tab3Page),
        pathMatch: 'full'
      },
      {
        path: 'profile/:did/post/:uri',
        loadComponent: () => import('../post-view/post-view.page').then((m) => m.PostViewPage),
        pathMatch: 'full'
      },



      // initial
      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full',
  },
];
