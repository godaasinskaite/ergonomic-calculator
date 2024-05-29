import { Component, OnInit, ViewChild } from '@angular/core';
import { Anthropometrics } from '../../model/anthropometric-data';
import { NgForm } from '@angular/forms';
import { AnthropometricsService } from '../../services/anthropometrics.service';
import { DomSanitizer } from '@angular/platform-browser';

import { PdfModalComponent } from '../pdf-modal/pdf-modal.component';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-anthropometrics-form',
  templateUrl: './anthropometrics-form.component.html',
  styleUrl: './anthropometrics-form.component.css'
})
export class AnthropometricsFormComponent {
  pdfUrl: any;
  emailToIdentify!: string;
  isDownloadFailed!: boolean;
  dowloadErrorMessage!: string;
  readyForPdf: boolean = false;

  @ViewChild(PdfModalComponent)
  pdfModal!: PdfModalComponent;

  constructor(private anthropometricsService: AnthropometricsService,
    private personService: PersonService, 
    private sanitizer: DomSanitizer) {}
  
  onSubmit(form: NgForm): void {
    if (form.valid) {
      const anthropometrics: Anthropometrics = {
        personEmail: form.value.personEmail,
        height: form.value.height,
        sittingHeight: form.value.sittingHeight,
        shoulderHeight: form.value.shoulderHeight,
        lowerLegLength: form.value.lowerLegLength,
        hipBreadth: form.value.lowerLegLength,
        elbowHeight: form.value.elbowHeight,
        eyeHeightStanding: form.value.eyeHeightStanding,
        elbowHeightStanding: form.value.elbowHeightStanding,
        thighClearance: form.value.thighClearance,
        eyeHeight: form.value.thighClearance,
        shoulderBreadth: form.value.shoulderBreadth,
        kneeHeight: form.value.kneeHeight
      };
      this.emailToIdentify = form.value.personEmail;
      console.log(anthropometrics);
      this.anthropometricsService.saveAnthropometrics(anthropometrics).subscribe({
        next: () => {
          console.log('Anthropometrics saved successfully');
          this.readyForPdf = true;
          console.log('readyForPdf:', this.readyForPdf);
          form.reset();
        }
      });
    }
  }

  getPdf(email: string) {
    this.anthropometricsService.getPdf(email).subscribe(
      (pdfData: any) => {
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      },
      error => {
        console.error('Error fetching PDF:', error);
      }
    );
  }

  downloadPdf() {
    this.anthropometricsService.downloadPdf(this.emailToIdentify)
    .catch(() => {
      this.isDownloadFailed = true;
      this.dowloadErrorMessage = 'Something went wrong. Can not download PDF.'
    });
  }

  deleteOnClose() {
    this.personService.deletePerson(this.emailToIdentify).subscribe();
  }
}
