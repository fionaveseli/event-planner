import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  template: `
    <section class="page">
      <h1>Login</h1>
      <p>Placeholder</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {}