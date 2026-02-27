import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="shell">
      <header class="topbar">
        <a class="brand" routerLink="/dashboard">Event Planner</a>

        <nav class="nav">
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/events" routerLinkActive="active">Events</a>
          <a routerLink="/bookings/new" routerLinkActive="active">Bookings</a>
        </nav>

        <div class="actions">
          @if (auth.isAuthenticated()) {
            <button type="button" (click)="logout()">Logout</button>
          } @else {
            <a routerLink="/auth/login">Login</a>
          }
        </div>
      </header>

      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  readonly auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}