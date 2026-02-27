import { Routes } from '@angular/router';
import { EventsListPage } from './pages/events-list/events-list.page';
import { EventDetailPage } from './pages/event-detail/event-detail.page';
import { eventDetailResolver } from '../../core/resolvers/event-detail.resolver';

export const EVENTS_ROUTES: Routes = [
  { path: '', component: EventsListPage },
  {
    path: ':id',
    component: EventDetailPage,
    resolve: { event: eventDetailResolver },
  },
];