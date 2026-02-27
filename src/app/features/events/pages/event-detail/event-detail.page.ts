import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import type { EventItem } from '../../../../core/models/event.models';

@Component({
  selector: 'app-event-detail-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page">
      <a class="back" routerLink="/events">← Back</a>

      @if (!event()) {
        <p class="muted">Event not found.</p>
      } @else {
        <h1>{{ event()!.title }}</h1>
        <p class="meta">{{ event()!.location }} • {{ event()!.dateIso }}</p>
      }
    </section>
  `,
  styleUrl: './event-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailPage {
  private readonly route = inject(ActivatedRoute);

  readonly event = toSignal<EventItem | null>(
    this.route.data.pipe(map((d) => d['event'] as EventItem | null)),
    { initialValue: null }
  );
}