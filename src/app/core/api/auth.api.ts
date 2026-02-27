import { Observable } from 'rxjs';
import type { LoginRequest, LoginResponse } from '../models/auth.models';

export interface AuthApi {
  login(payload: LoginRequest): Observable<LoginResponse>;
}