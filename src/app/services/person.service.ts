import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CredentialsDto } from '../model/credentials';
import { PasswordUpdateRequest } from '../model/password-update';
import { Person } from '../model/person';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  onLogin(credentials: CredentialsDto): Observable<any> {
    console.log('trying to log in');
    return this.http
      .post<any>('http://localhost:8081/api/person/login', credentials)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.authService.setAuthToken(response.token);
            this.authService.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  onRegister(person: Person): Observable<any> {
    return this.http
      .put<any>('http://localhost:8081/api/person/register', person)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.authService.setAuthToken(response.token);
            this.authService.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  updatePassword(
    passwordUpdateRequest: PasswordUpdateRequest
  ): Observable<any> {
    const url = 'http://localhost:8081/api/person/updatePassword';
    const headers = this.authService.getHeaders();
    return this.http.put<any>(url, passwordUpdateRequest, { headers });
  }

  deletePerson(email: string): Observable<string> {
    const url = 'http://localhost:8081/api/person/delete/' + email;
    return this.http.delete<string>(url);
  }
}
