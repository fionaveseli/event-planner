import { Component, ChangeDetectionStrategy, inject, DestroyRef, signal, computed } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { startWith, debounceTime, distinctUntilChanged, switchMap, finalize } from "rxjs";
import { EventItem } from "../../../../core/models/event.models";
import { EventsService } from "../../services/events.service";


@Component({
  selector: 'app-events-list-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="page">
      <header class="header">
        <h1>Events</h1>

        <input
          class="search"
          type="text"
          [formControl]="searchControl"
          placeholder="Search by title or location…"
        />
      </header>

      @if (isLoading()) {
        <p class="muted">Loading…</p>
      }

      @if (!isLoading() && filteredEvents().length === 0) {
        <p class="muted">No events found.</p>
      }

      <div class="list">
        @for (event of filteredEvents(); track event.id) {
          <article class="card">
            <div class="title">{{ event.title }}</div>
            <div class="meta">{{ event.location }} • {{ event.dateIso }}</div>
          </article>
        }
      </div>
    </section>
  `,
  styleUrl: './events-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListPage {
  private readonly eventsService = inject(EventsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchControl = new FormControl<string>('', { nonNullable: true });

  readonly isLoading = signal(false);

  // Observable stream: search input -> debounce -> switchMap(API)
  private readonly events$ = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term) => {
      this.isLoading.set(true);
      return this.eventsService.searchEvents$(term).pipe(
        finalize(() => this.isLoading.set(false))
      );
    }),
    takeUntilDestroyed(this.destroyRef)
  );

  // Observable -> Signal (so template + computed can use it)
readonly events = toSignal(this.events$, { initialValue: [] as EventItem[] });

  // Signal + computed for derived filtered state (requirement)
  // (This example applies an extra local filter rule: trim + normalize)
  readonly filteredEvents = computed(() => {
    const term = this.searchControl.value.trim().toLowerCase();
    const items = this.events();

    if (!term) return items;

    return items?.filter((e) => {
      const hay = `${e.title} ${e.location}`.toLowerCase();
      return hay.includes(term);
    });
  });
}