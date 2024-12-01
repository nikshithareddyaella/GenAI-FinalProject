import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginModel {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private inactivityTimeout: any;

  private loggedInSource = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedInSource.asObservable();

  userDetails: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(creds: LoginModel): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/login`, creds).pipe(
      tap((res: { token: string }) => {
        localStorage.setItem('token', res.token);
        this.loggedInSource.next(true);
        this.startInactivityTimer();
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSource.next(false);
    clearTimeout(this.inactivityTimeout);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  startInactivityTimer(): void {
    this.clearInactivityTimer();
    this.inactivityTimeout = setTimeout(() => {
      this.logout();
      alert('You have been logged out due to inactivity.');
    }, 15 * 60 * 1000);
  }

  clearInactivityTimer(): void {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
      this.inactivityTimeout = null;
    }
  }
}
