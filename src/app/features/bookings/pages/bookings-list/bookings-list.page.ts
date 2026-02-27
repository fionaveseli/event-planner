import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookingsService } from '../../services/bookings.service';
import { EventsService } from '../../../events/services/events.service';

@Component({
  selector: 'app-bookings-list-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page">
      <header class="header">
        <h1>Bookings</h1>
        <a class="btn" routerLink="/bookings/new">New booking</a>
      </header>

      @if (bookings().length === 0) {
        <p class="muted">No bookings yet.</p>
      }

      @for (b of bookings(); track b.id) {
        <article class="card">
          <div class="title">{{ eventTitle(b.eventId) }}</div>
          <div class="meta">{{ b.clientName }} • {{ b.clientEmail }}</div>
          @if (b.notes) {
            <div class="notes">{{ b.notes }}</div>
          }
          <div class="actions">
            <button class="btn-delete" (click)="deleteBooking(b.id)">Delete</button>
          </div>
        </article>
      }
    </section>
  `,
  styleUrl: './bookings-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsListPage {
  private readonly bookingsService = inject(BookingsService);
  private readonly eventsService = inject(EventsService);

  readonly bookings = computed(() => this.bookingsService.bookings());

  private readonly eventsMap = computed(() => {
    const map = new Map<string, string>();
    for (const e of this.eventsService.events()) {
      map.set(e.id, e.title);
    }
    return map;
  });

  eventTitle(eventId: string): string {
    return this.eventsMap().get(eventId) ?? 'Unknown event';
  }

  deleteBooking(id: string) {
    this.bookingsService.deleteBooking(id);
  }
}
