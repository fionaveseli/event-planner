import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import type { EventItem, EventCreateRequest, EventUpdateRequest } from '../../../core/models/event.models';

const SEED_EVENTS: EventItem[] = [
  { id: '1', title: 'Studio Portrait Session', location: 'Amsterdam', dateIso: '2026-03-10' },
  { id: '2', title: 'Wedding Rehearsal', location: 'Berlin', dateIso: '2026-03-14' },
  { id: '3', title: 'Product Shoot', location: 'Prishtina', dateIso: '2026-03-20' },
  { id: '4', title: 'Band Practice', location: 'Amsterdam', dateIso: '2026-03-22' },
];

@Injectable({ providedIn: 'root' })
export class FakeEventsApi {
  private readonly _events = signal<EventItem[]>(SEED_EVENTS);
  readonly events = this._events.asReadonly();

  search(term: string): Observable<EventItem[]> {
    const q = term.trim().toLowerCase();

    const filtered = !q
      ? this._events()
      : this._events().filter(e =>
          e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
        );

    return of(filtered).pipe(delay(250));
  }

  getById(id: string): Observable<EventItem | null> {
    const found = this._events().find(e => e.id === id) ?? null;
    return of(found).pipe(delay(200));
  }

  create(payload: EventCreateRequest): Observable<EventItem> {
    const event: EventItem = {
      id: crypto.randomUUID(),
      ...payload,
    };

    return of(event).pipe(
      delay(200),
      tap(e => this._events.update(prev => [...prev, e]))
    );
  }

  update(id: string, payload: EventUpdateRequest): Observable<EventItem> {
    const updated: EventItem = { id, ...payload };

    return of(updated).pipe(
      delay(200),
      tap(e => this._events.update(prev => prev.map(ev => ev.id === id ? e : ev)))
    );
  }

  delete(id: string): Observable<boolean> {
    return of(true).pipe(
      delay(200),
      tap(() => this._events.update(prev => prev.filter(e => e.id !== id)))
    );
  }
}
