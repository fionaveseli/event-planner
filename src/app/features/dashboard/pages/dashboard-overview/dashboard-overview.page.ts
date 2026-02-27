import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-overview-page',
  standalone: true,
  template: `
    <section class="page">
      <h1>Dashboard</h1>
      <p>Overview (placeholder)</p>

      <button (click)="logout()">Logout</button>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardOverviewPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
