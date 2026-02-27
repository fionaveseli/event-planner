import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import type { BookingCreateRequest, Booking } from '../../../core/models/booking.models';

@Injectable({ providedIn: 'root' })
export class FakeBookingsApi {
  create(payload: BookingCreateRequest): Observable<Booking> {
    const booking: Booking = {
      id: crypto.randomUUID(),
      eventId: payload.eventId,
      clientName: payload.clientName,
      clientEmail: payload.clientEmail,
      notes: payload.notes,
      createdAtIso: new Date().toISOString(),
    };

    return of(booking).pipe(delay(300));
  }
}