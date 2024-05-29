import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string): void {
    if(token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token")
    }
  }

  public getHeaders(): HttpHeaders {
    const authToken = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: authToken ? `Bearer ${authToken}` : ''
    });
  }


  onLogOut() {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
