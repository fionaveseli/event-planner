import { Routes } from '@angular/router';
import { BookingCreatePage } from './pages/booking-create/booking-create.page';

export const BOOKINGS_ROUTES: Routes = [
  { path: 'new', component: BookingCreatePage },
  { path: '', pathMatch: 'full', redirectTo: 'new' },
];