import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
