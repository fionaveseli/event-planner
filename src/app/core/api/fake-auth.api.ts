import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import type { AuthApi } from './auth.api';
import type { LoginRequest, LoginResponse } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class FakeAuthApi implements AuthApi {
  login(payload: LoginRequest): Observable<LoginResponse> {
    // tiny fake delay so it feels real
    const isValid = payload.email.includes('@') && payload.password.length >= 6;

    if (!isValid) {
      return throwError(() => new Error('Invalid credentials')).pipe(delay(400));
    }

    return of({ token: 'demo-token' }).pipe(delay(400));
  }
}