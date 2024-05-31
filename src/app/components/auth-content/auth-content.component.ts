import { Component } from '@angular/core'; 
import { DomSanitizer } from '@angular/platform-browser';
import { AnthropometricsService } from '../../services/anthropometrics.service';

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrl: './auth-content.component.css',
})
export class AuthContentComponent {
  activeTab: string = 'password';
  pdfUrl: any;
  personEmail!: string;

  constructor(
    private anthropometricsService: AnthropometricsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getPdf();
  }

  getPdf() {
    this.anthropometricsService.getPdfAfterAuth().subscribe(
      (pdfData: any) => {
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      },
      (error) => {
        console.error('Error fetching PDF:', error);
      }
    );
  }

  downloadPdf() {
    this.anthropometricsService
      .downloadPdfAfterAuth()
      .then(() => {
        console.log('PDF downloaded successfully');
      })
      .catch((error) => {
        console.error('Failed to download PDF:', error);
      });
  }
}
