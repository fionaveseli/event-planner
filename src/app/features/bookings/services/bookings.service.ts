import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import type { Booking, BookingCreateRequest } from '../../../core/models/booking.models';

@Injectable({ providedIn: 'root' })
export class BookingsService {
  private readonly _bookings = signal<Booking[]>([]);
  readonly bookings = this._bookings.asReadonly();

  createBooking$(payload: BookingCreateRequest): Observable<Booking> {
    const booking: Booking = {
      id: crypto.randomUUID(),
      createdAtIso: new Date().toISOString(),
      ...payload,
      notes: payload.notes?.trim(),
    };

    return of(booking).pipe(
      delay(200),
      tap((b) => {
        this._bookings.update(prev => [b, ...prev]);
      })
    );
  }

  deleteBooking(id: string): void {
    this._bookings.update(prev => prev.filter(b => b.id !== id));
  }
}