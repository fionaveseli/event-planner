import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-booking-create-page',
  standalone: true,
  template: `
    <section class="page">
      <h1>Create Booking</h1>
      <p>Placeholder</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCreatePage {}