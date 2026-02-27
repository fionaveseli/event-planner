import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { finalize, Observable } from 'rxjs';

import { BookingsService } from '../../services/bookings.service';
import { EventsService } from '../../../events/services/events.service';
import type { EventItem } from '../../../../core/models/event.models';

@Component({
  selector: 'app-booking-create-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="page">
      <h1>Create Booking</h1>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>
          <span>Event</span>

          <select formControlName="eventId" [disabled]="isEventsLoading()">
            <option value="" disabled>Select an event…</option>

            @for (e of events(); track e.id) {
              <option [value]="e.id">
                {{ e.title }} — {{ e.location }} ({{ e.dateIso }})
              </option>
            }
          </select>
        </label>

        @if (isEventsLoading()) {
          <p class="muted">Loading events…</p>
        }

        <label>
          <span>Client Name</span>
          <input formControlName="clientName" />
        </label>

        <label>
          <span>Client Email</span>
          <input formControlName="clientEmail" />
        </label>

        <label>
          <span>Notes</span>
          <textarea formControlName="notes"></textarea>
        </label>

        <button type="submit" [disabled]="form.invalid || isSubmitting()">
          @if (isSubmitting()) { Creating… } @else { Create Booking }
        </button>
      </form>

      @if (successMessage()) {
        <p class="success">{{ successMessage() }}</p>
      }
    </section>
  `,
  styleUrl: './booking-create.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCreatePage {
  private readonly fb = inject(FormBuilder);
  private readonly bookings = inject(BookingsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly eventsService = inject(EventsService);

  readonly isEventsLoading = signal(false);

  private readonly events$: Observable<EventItem[]> = (() => {
    this.isEventsLoading.set(true);
    return this.eventsService.getAllEvents$().pipe(
      finalize(() => this.isEventsLoading.set(false))
    );
  })();

  readonly events = toSignal(this.events$, {
    initialValue: [],
  });

  readonly isSubmitting = signal(false);
  readonly successMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    eventId: ['', Validators.required],
    clientName: ['', Validators.required],
    clientEmail: ['', [Validators.required, Validators.email]],
    notes: [''],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set(null);

    this.bookings
      .createBooking$(this.form.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.successMessage.set('Booking created successfully.');
          this.form.reset();
        },
        error: () => {
          this.isSubmitting.set(false);
        },
      });
  }
}