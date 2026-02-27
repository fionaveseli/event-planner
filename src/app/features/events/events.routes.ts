import { Routes } from '@angular/router';
import { EventsListPage } from './pages/events-list/events-list.page';
import { EventDetailPage } from './pages/event-detail/event-detail.page';
import { EventCreatePage } from './pages/event-create/event-create.page';
import { EventEditPage } from './pages/event-edit/event-edit.page';
import { eventDetailResolver } from '../../core/resolvers/event-detail.resolver';
import { authGuard } from '../../core/guards/auth.guard';

export const EVENTS_ROUTES: Routes = [
  { path: '', component: EventsListPage, canActivate: [authGuard] },
  { path: 'new', component: EventCreatePage, canActivate: [authGuard] },

  {
    path: ':id',
    component: EventDetailPage,
    resolve: { event: eventDetailResolver },
    canActivate: [authGuard],
  },
  {
    path: ':id/edit',
    component: EventEditPage,
    resolve: { event: eventDetailResolver },
    canActivate: [authGuard],
  },
];
