import { Injectable, inject } from '@angular/core';
import { FakeBookingsApi } from '../data/fake-bookings.api';
import type { BookingCreateRequest } from '../../../core/models/booking.models';

@Injectable({ providedIn: 'root' })
export class BookingsService {
  private readonly api = inject(FakeBookingsApi);

  createBooking$(payload: BookingCreateRequest) {
    return this.api.create(payload);
  }
}