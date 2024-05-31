import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anthropometrics } from '../model/anthropometric-data';
import { AnthropometricsUpdate } from '../model/anthropometric-update';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AnthropometricsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  saveAnthropometrics(data: Anthropometrics): Observable<Anthropometrics> {
    return this.http.post<Anthropometrics>(
      'http://localhost:8081/api/ergonomic/new',
      data
    );
  }

  saveAnthropometricsWithAuth(
    data: AnthropometricsUpdate
  ): Observable<Anthropometrics> {
    const headers = this.authService.getHeaders();
    return this.http.post<Anthropometrics>(
      'http://localhost:8081/api/ergonomic/anthropometrics',
      data,
      { headers: headers }
    );
  }

  getPdf(email: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      Accept: 'application/pdf',
    });

    return this.http.get<Blob>(
      'http://localhost:8081/api/ergonomic/openPdf/' + email,
      { headers: headers, responseType: 'blob' as 'json' }
    );
  }

  downloadPdf(email: string): Promise<void> {
    return new Promise(() => {
      const apiUrl = `http://localhost:8081/api/ergonomic/download/${email}`;
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch PDF');
          }
          window.location.href = apiUrl;
        })
        .catch(() => {
          console.error('Failed to fetch PDF');
        });
    });
  }

  getPdfAfterAuth(): Observable<any> {
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      Accept: 'application/pdf',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('http://localhost:8081/api/ergonomic/auth/pdf', {
      headers: headers,
      responseType: 'blob',
    });
  }

  downloadPdfAfterAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      const apiUrl = 'http://localhost:8081/api/ergonomic/auth/download';
      const token = this.authService.getAuthToken();
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);

      fetch(apiUrl, {
        method: 'GET',
        headers: headers,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch PDF');
          }
          return response.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'workspace.pdf';

          link.dispatchEvent(new MouseEvent('click'));
          window.URL.revokeObjectURL(url);
          resolve();
        })
        .catch((error) => {
          console.error('Failed to fetch PDF:', error);
          reject(error);
        });
    });
  }
}
