import { Routes } from '@angular/router';
import { EventsListPage } from './pages/events-list/events-list.page';
import { EventDetailPage } from './pages/event-detail/event-detail.page';
import { eventDetailResolver } from '../../core/resolvers/event-detail.resolver';
import { authGuard } from '../../core/guards/auth.guard';

export const EVENTS_ROUTES: Routes = [
  { path: '', component: EventsListPage, canActivate: [authGuard] },

  {
    path: ':id',
    component: EventDetailPage,
    resolve: { event: eventDetailResolver },
    canActivate: [authGuard],
  },
];
