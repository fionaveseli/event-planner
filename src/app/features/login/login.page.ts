import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="auth">
      <div class="card">
        <h1>Login</h1>
        <p class="muted">Use any email + password (demo for now).</p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>
            <span>Email</span>
            <input
              type="email"
              formControlName="email"
              autocomplete="email"
              placeholder="you@example.com"
            />
          </label>
          @if (showEmailError()) {
            <p class="error">Please enter a valid email.</p>
          }

          <label>
            <span>Password</span>
            <input
              type="password"
              formControlName="password"
              autocomplete="current-password"
              placeholder="••••••••"
            />
          </label>
          @if (showPasswordError()) {
            <p class="error">Password must be at least 6 characters.</p>
          }

          <button type="submit" [disabled]="form.invalid || isSubmitting()">
            @if (isSubmitting()) { Logging in… } @else { Login }
          </button>
        </form>

        <p class="hint">
          After login you'll be redirected to the dashboard.
        </p>
      </div>
    </section>
  `,
  styleUrl: './login.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  showEmailError() {
    const c = this.form.controls.email;
    return c.touched && c.invalid;
  }

  showPasswordError() {
    const c = this.form.controls.password;
    return c.touched && c.invalid;
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Demo token (next step we replace with HttpClient call)
    this.auth.login('demo-token');

    this.isSubmitting.set(false);
    await this.router.navigateByUrl('/dashboard');
  }
}