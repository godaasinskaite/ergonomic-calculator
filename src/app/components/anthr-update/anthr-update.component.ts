import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnthropometricsUpdate } from '../../model/anthropometric-update';
import { AnthropometricsService } from '../../services/anthropometrics.service';

@Component({
  selector: 'app-anthr-update',
  templateUrl: './anthr-update.component.html',
  styleUrl: './anthr-update.component.css'
})
export class AnthrUpdateComponent {

  constructor(private anthropometricsService: AnthropometricsService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const anthropometrics: AnthropometricsUpdate = {
        height: form.value.height,
        sittingHeight: form.value.sittingHeight,
        shoulderHeight: form.value.shoulderHeight,
        lowerLegLength: form.value.lowerLegLength,
        hipBreadth: form.value.hipBreadth,
        elbowHeight: form.value.elbowHeight,
        eyeHeightStanding: form.value.eyeHeightStanding,
        elbowHeightStanding: form.value.elbowHeightStanding,
        thighClearance: form.value.thighClearance,
        eyeHeight: form.value.eyeHeight,
        shoulderBreadth: form.value.shoulderBreadth,
        kneeHeight: form.value.kneeHeight
      };
      this.anthropometricsService.saveAnthropometricsWithAuth(anthropometrics).subscribe({
        next: () => {
          console.log('Anthropometrics saved successfully');
          form.reset();
        }
      });
    }
  }
}
