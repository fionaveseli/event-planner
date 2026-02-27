import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-overview-page',
  standalone: true,
  template: `
    <section class="page">
      <h1>Dashboard</h1>
      <p>Overview (placeholder)</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardOverviewPage {}