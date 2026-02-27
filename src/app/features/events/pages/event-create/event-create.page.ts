import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event-create-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="page">
      <h1>Create Event</h1>

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
            Creating…
          } @else {
            Create Event
          }
        </button>
      </form>
    </section>
  `,
  styleUrl: './event-create.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCreatePage {
  private readonly fb = inject(FormBuilder);
  private readonly eventsService = inject(EventsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    location: ['', Validators.required],
    dateIso: ['', Validators.required],
  });

  isInvalid(name: 'title' | 'location' | 'dateIso') {
    const c = this.form.controls[name];
    return c.touched && c.invalid;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    this.eventsService
      .createEvent$(this.form.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async () => {
          this.isSubmitting.set(false);
          await this.router.navigateByUrl('/events');
        },
        error: () => {
          this.isSubmitting.set(false);
        },
      });
  }
}
