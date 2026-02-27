import { Injectable, inject } from '@angular/core';
import { FakeEventsApi } from '../data/fake-events.api';
import type { EventItem, EventCreateRequest, EventUpdateRequest } from '../../../core/models/event.models';
import type { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly api = inject(FakeEventsApi);

  readonly events = this.api.events;

  searchEvents$(term: string): Observable<EventItem[]> {
    return this.api.search(term);
  }

  getAllEvents$(): Observable<EventItem[]> {
    return this.searchEvents$('');
  }

  getEventById$(id: string) {
    return this.api.getById(id);
  }

  createEvent$(payload: EventCreateRequest): Observable<EventItem> {
    return this.api.create(payload);
  }

  updateEvent$(id: string, payload: EventUpdateRequest): Observable<EventItem> {
    return this.api.update(id, payload);
  }

  deleteEvent$(id: string): Observable<boolean> {
    return this.api.delete(id);
  }
}
