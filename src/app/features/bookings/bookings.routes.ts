import { Routes } from '@angular/router';
import { BookingCreatePage } from './pages/booking-create/booking-create.page';
import { authGuard } from '../../core/guards/auth.guard';

export const BOOKINGS_ROUTES: Routes = [
  {
    path: 'new',
    component: BookingCreatePage,
    canActivate: [authGuard],
  },
];