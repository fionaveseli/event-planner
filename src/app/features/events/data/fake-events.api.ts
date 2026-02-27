import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import type { EventItem } from '../../../core/models/event.models';

const EVENTS: EventItem[] = [
  { id: '1', title: 'Studio Portrait Session', location: 'Amsterdam', dateIso: '2026-03-10' },
  { id: '2', title: 'Wedding Rehearsal', location: 'Berlin', dateIso: '2026-03-14' },
  { id: '3', title: 'Product Shoot', location: 'Prishtina', dateIso: '2026-03-20' },
  { id: '4', title: 'Band Practice', location: 'Amsterdam', dateIso: '2026-03-22' },
];

@Injectable({ providedIn: 'root' })
export class FakeEventsApi {
  search(term: string): Observable<EventItem[]> {
    const q = term.trim().toLowerCase();

    const filtered = !q
      ? EVENTS
      : EVENTS.filter(e =>
          e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
        );

    return of(filtered).pipe(delay(250));
  }

  getById(id: string): Observable<EventItem | null> {
    const found = EVENTS.find(e => e.id === id) ?? null;
    return of(found).pipe(delay(200));
  }
}