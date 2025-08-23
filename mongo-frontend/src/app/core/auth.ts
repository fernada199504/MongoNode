import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface LoginDto { correo: string; contraseña: string; }
export interface RegisterDto { nombre: string; correo: string; contraseña: string; }
export interface LoginResponse { token: string; user?: any; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  login(data: LoginDto) {
    return this.http.post<LoginResponse>(`${this.base}/auth/login`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        if (res.user) localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  register(data: RegisterDto) {
    return this.http.post(`${this.base}/auth/register`, data);
  }

  me() {
    return this.http.get(`${this.base}/auth/me`);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  get token() { return localStorage.getItem('token') ?? ''; }
  get isAuthenticated() { return !!this.token; }
  get currentUser() {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }
}