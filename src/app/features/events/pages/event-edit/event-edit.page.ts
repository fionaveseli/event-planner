import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';

import { EventsService } from '../../services/events.service';
import type { EventItem } from '../../../../core/models/event.models';

@Component({
  selector: 'app-event-edit-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="page">
      <a class="back" routerLink="/events">← Back</a>

      @if (!event()) {
        <p class="muted">Event not found.</p>
      } @else {
        <h1>Edit Event</h1>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>
            <span>Title</span>
            <input formControlName="title" />
          </label>
          @if (isInvalid('title')) {
            <p class="error">Title is required.</p>
          }

          <label>
            <span>Location</span>
            <input formControlName="location" />
          </label>
          @if (isInvalid('location')) {
            <p class="error">Location is required.</p>
          }

          <label>
            <span>Date</span>
            <input type="date" formControlName="dateIso" />
          </label>
          @if (isInvalid('dateIso')) {
            <p class="error">Date is required.</p>
          }

          <button type="submit" [disabled]="isSubmitting()">
            @if (isSubmitting()) {
              Saving…
            } @else {
              Save Changes
            }
          </button>
        </form>
      }
    </section>
  `,
  styleUrl: './event-edit.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventEditPage {
  private readonly fb = inject(FormBuilder);
  private readonly eventsService = inject(EventsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isSubmitting = signal(false);

  readonly event = toSignal<EventItem | null>(
    this.route.data.pipe(map(d => d['event'] as EventItem | null)),
    { initialValue: null }
  );

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    location: ['', Validators.required],
    dateIso: ['', Validators.required],
  });

  constructor() {
    const event = this.route.snapshot.data['event'] as EventItem | null;
    if (event) {
      this.form.patchValue({
        title: event.title,
        location: event.location,
        dateIso: event.dateIso,
      });
    }
  }

  isInvalid(name: 'title' | 'location' | 'dateIso') {
    const c = this.form.controls[name];
    return c.touched && c.invalid;
  }

  submit() {
    const event = this.event();
    if (this.form.invalid || !event) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    this.eventsService
      .updateEvent$(event.id, this.form.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async () => {
          this.isSubmitting.set(false);
          await this.router.navigateByUrl('/events/' + event.id);
        },
        error: () => {
          this.isSubmitting.set(false);
        },
      });
  }
}
