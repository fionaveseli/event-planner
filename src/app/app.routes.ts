import { Routes } from '@angular/router';
import { NotFoundPage } from './shared/pages/not-found/not-found.page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.AUTH_ROUTES),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./features/events/events.routes')
        .then(m => m.EVENTS_ROUTES),
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./features/bookings/bookings.routes')
        .then(m => m.BOOKINGS_ROUTES),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes')
        .then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: '**',
   component: NotFoundPage,
  },
];