import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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

      <p class="muted">List page placeholder (next step we’ll show created bookings).</p>
    </section>
  `,
  styleUrl: './bookings-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsListPage {}