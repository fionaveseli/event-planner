import { Injectable, inject } from '@angular/core';
import { FakeEventsApi } from '../data/fake-events.api';
import type { EventItem } from '../../../core/models/event.models';
import type { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly api = inject(FakeEventsApi);

  searchEvents$(term: string): Observable<EventItem[]> {
    return this.api.search(term);
  }

  getAllEvents$(): Observable<EventItem[]> {
    return this.searchEvents$('');
  }

  getEventById$(id: string) {
    return this.api.getById(id);
  }
}