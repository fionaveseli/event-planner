import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import type { EventItem } from '../../../../core/models/event.models';
import { EventsService } from '../../services/events.service';

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

        <div class="actions">
          <a class="btn" [routerLink]="['/events', event()!.id, 'edit']">Edit</a>
          <button class="btn btn-danger" (click)="deleteEvent()" [disabled]="isDeleting()">
            @if (isDeleting()) {
              Deleting…
            } @else {
              Delete
            }
          </button>
        </div>
      }
    </section>
  `,
  styleUrl: './event-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly eventsService = inject(EventsService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isDeleting = signal(false);

  readonly event = toSignal<EventItem | null>(
    this.route.data.pipe(map((d) => d['event'] as EventItem | null)),
    { initialValue: null }
  );

  deleteEvent() {
    const event = this.event();
    if (!event) return;

    this.isDeleting.set(true);

    this.eventsService
      .deleteEvent$(event.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async () => {
          await this.router.navigateByUrl('/events');
        },
        error: () => {
          this.isDeleting.set(false);
        },
      });
  }
}
