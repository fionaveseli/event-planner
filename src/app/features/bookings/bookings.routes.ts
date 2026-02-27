import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { BookingCreatePage } from './pages/booking-create/booking-create.page';
import { BookingsListPage } from './pages/bookings-list/bookings-list.page';

export const BOOKINGS_ROUTES: Routes = [
  { path: '', component: BookingsListPage, canActivate: [authGuard] },
  { path: 'new', component: BookingCreatePage, canActivate: [authGuard] },
];