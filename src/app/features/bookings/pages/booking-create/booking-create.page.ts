import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { Router } from '@angular/router';

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
            @if (isEventsLoading()) {
              <p class="muted">Loading events…</p>
            }
            @for (e of events(); track e.id) {
              <option [value]="e.id">{{ e.title }} — {{ e.location }} ({{ e.dateIso }})</option>
            }
          </select>
        </label>

        @if (isInvalid('eventId')) {
          <p class="error">Please select an event.</p>
        }

        <label>
          <span>Client Name</span>
          <input formControlName="clientName" />
        </label>

        @if (isInvalid('clientName')) {
          <p class="error">Client name is required.</p>
        }
        <label>
          <span>Client Email</span>
          <input formControlName="clientEmail" />
          @if (emailError()) {
            <p class="error">{{ emailError() }}</p>
          }
        </label>

        <label>
          <span>Notes</span>
          <textarea formControlName="notes"></textarea>
        </label>

        <button type="submit">
          @if (isSubmitting()) {
            Creating…
          } @else {
            Create Booking
          }
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
  private readonly router = inject(Router);

  readonly isEventsLoading = signal(false);

  private readonly events$: Observable<EventItem[]> = (() => {
    this.isEventsLoading.set(true);
    return this.eventsService.getAllEvents$().pipe(finalize(() => this.isEventsLoading.set(false)));
  })();

  readonly events = toSignal(this.events$, {
    initialValue: [],
  });
  readonly canSubmit = computed(() => {
    return !this.isSubmitting() && !this.isEventsLoading() && this.form.valid;
  });

  readonly isSubmitting = signal(false);
  readonly successMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    eventId: ['', Validators.required],
    clientName: ['', Validators.required],
    clientEmail: ['', [Validators.required, Validators.email]],
    notes: [''],
  });

  isInvalid(name: 'eventId' | 'clientName' | 'clientEmail') {
    const c = this.form.controls[name];
    return c.touched && c.invalid;
  }

  emailError() {
    const c = this.form.controls.clientEmail;
    if (!c.touched) return null;
    if (c.hasError('required')) return 'Email is required.';
    if (c.hasError('email')) return 'Please enter a valid email.';
    return null;
  }

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
        next: async () => {
          this.isSubmitting.set(false);
          await this.router.navigateByUrl('/bookings');
        },
        error: () => {
          this.isSubmitting.set(false);
        },
      });
  }
}
