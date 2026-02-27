import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventsService } from '../../../events/services/events.service';
import { BookingsService } from '../../../bookings/services/bookings.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-overview-page',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <section class="page">
      <h1>Dashboard</h1>

      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ totalEvents() }}</div>
          <div class="stat-label">Total Events</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ totalBookings() }}</div>
          <div class="stat-label">Total Bookings</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ upcomingEvents().length }}</div>
          <div class="stat-label">Upcoming Events</div>
        </div>
      </div>

      <h2>Upcoming Events</h2>

      @if (upcomingEvents().length === 0) {
        <p class="muted">No upcoming events.</p>
      }

      <div class="list">
        @for (event of upcomingEvents(); track event.id) {
          <article class="card" [routerLink]="['/events', event.id]">
            <div class="title">{{ event.title }}</div>
            <div class="meta">{{ event.location }} • {{ event.dateIso | date: 'mediumDate' }}</div>
          </article>
        }
      </div>
    </section>
  `,
  styleUrl: './dashboard-overview.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardOverviewPage {
  private readonly eventsService = inject(EventsService);
  private readonly bookingsService = inject(BookingsService);

  readonly totalEvents = computed(() => this.eventsService.events().length);
  readonly totalBookings = computed(() => this.bookingsService.bookings().length);

  readonly upcomingEvents = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return this.eventsService
      .events()
      .filter(e => e.dateIso >= today)
      .sort((a, b) => a.dateIso.localeCompare(b.dateIso));
  });
}
