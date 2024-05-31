import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnthropometricsService } from '../../services/anthropometrics.service';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-password-update-form',
  templateUrl: './password-update-form.component.html',
  styleUrl: './password-update-form.component.css',
})
export class PasswordUpdateFormComponent {
  errorMessage!: string;

  constructor(private service: PersonService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const oldPassword = form.value.oldPassword;
      const newPassword = form.value.newPassword;
      const confirmPassword = form.value.confirmPassword;

      if (newPassword === confirmPassword) {
        const passwordRequest = {
          oldPassword,
          newPassword,
        };

        this.service.updatePassword(passwordRequest).subscribe(
          (response) => {
            console.log('Password updated successfully:', response);
            form.reset();
            this.errorMessage = '';
          },
          (error) => {
            console.error('Error updating password:', error);
            if (error.status === 406) {
              this.errorMessage = 'Incorrect old password';
            } else {
              this.errorMessage = 'An error occurred while updating password';
            }
          }
        );
      } else {
        this.errorMessage = 'Passwords do not match';
      }
    }
  }
}
