import { Injectable, computed, signal } from '@angular/core';
import { clearToken, getToken, setToken } from '../utils/storage.util';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _token = signal<string | null>(getToken());

  readonly token = computed(() => this._token());
  readonly isAuthenticated = computed(() => !!this._token());

  login(token: string): void {
    setToken(token);
    this._token.set(token);
  }

  logout(): void {
    clearToken();
    this._token.set(null);
  }
}