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
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

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
          },
          (error) => {
            console.error('Error updating password:', error);
          }
        );
      }
    }
  }

  passwordsMatch(): boolean {
    return (
      this.oldPassword !== this.newPassword &&
      this.newPassword === this.confirmPassword
    );
  }
}
