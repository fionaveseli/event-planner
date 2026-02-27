import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-events-list-page',
  standalone: true,
  template: `
    <section class="page">
      <h1>Events</h1>
      <p>List (placeholder)</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListPage {}