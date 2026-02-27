import { Injectable, inject } from '@angular/core';
import { FakeEventsApi } from '../data/fake-events.api';
import type { EventItem } from '../../../core/models/event.models';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly api = inject(FakeEventsApi);

  searchEvents$(term: string) {
    return this.api.search(term);
  }
}