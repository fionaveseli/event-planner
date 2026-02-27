import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookingsService } from '../../services/bookings.service';

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

      @for (b of bookings(); track b.id) {
        <article class="card">
          <div>{{ b.clientName }}</div>
          <div>{{ b.clientEmail }}</div>
        </article>
      }
    </section>
  `,
  styleUrl: './bookings-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsListPage {
  private readonly bookingsService = inject(BookingsService);
  readonly bookings = computed(() => this.bookingsService.bookings());
}
