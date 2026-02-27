import { Injectable, computed, signal, inject } from '@angular/core';
import { tap } from 'rxjs/operators';

import { clearToken, getToken, setToken } from '../utils/storage.util';
import { FakeAuthApi } from '../api/fake-auth.api';
import type { LoginRequest } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(FakeAuthApi);

  private readonly _token = signal<string | null>(getToken());

  readonly token = computed(() => this._token());
  readonly isAuthenticated = computed(() => !!this._token());

  login$(payload: LoginRequest) {
    return this.api.login(payload).pipe(
      tap((res) => {
        setToken(res.token);
        this._token.set(res.token);
      })
    );
  }

  logout(): void {
    clearToken();
    this._token.set(null);
  }
}