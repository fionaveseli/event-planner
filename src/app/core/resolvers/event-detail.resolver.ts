import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { EventsService } from '../../features/events/services/events.service';

export const eventDetailResolver: ResolveFn<unknown> = (route) => {
  const events = inject(EventsService);
  const id = route.paramMap.get('id') ?? '';
  return events.getEventById$(id);
};