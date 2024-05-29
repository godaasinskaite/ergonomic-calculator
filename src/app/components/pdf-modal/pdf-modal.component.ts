import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pdf-modal',
  templateUrl: './pdf-modal.component.html',
  styleUrl: './pdf-modal.component.css'
})
export class PdfModalComponent {
  @Input()
  pdfUrl!: string;

  @Input()
  isDownloadFailed!: boolean;
  @Input()
  downloadErrorMessage!: string;

  @Output()
  downloadPdfClicked: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  deletePersonClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) {}

  moveToRegistration() {
    this.router.navigate(['/login-form']);
  }

  onDownloadPdfClick() {
    this.downloadPdfClicked.emit();
  }

  onClickDelete() {
    this.deletePersonClicked.emit();
  }
}
