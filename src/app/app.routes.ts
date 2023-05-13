import { inject } from '@angular/core';
import { CanMatchFn, Router, Routes } from '@angular/router';
import { BskService } from './services/bsk/bsk.service';

const isLoggedIn: CanMatchFn = () => {
  const bsk = inject(BskService);
  const rtr = inject(Router);
  if (bsk.agent !== null) {
    rtr.navigateByUrl('/app');
    return false
  } else {
    return true;
  }
};


const isAuthenticated: CanMatchFn = () => {
  const bsk = inject(BskService);
  const rtr = inject(Router);
  if (bsk.agent !== null) {
    return true
  } else {
    rtr.navigateByUrl('/login');
    return false;
  }
};
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./pages/tabs/tabs.routes').then((m) => m.routes),
    canMatch: [isAuthenticated]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
    canMatch: [isLoggedIn],
  },
];
