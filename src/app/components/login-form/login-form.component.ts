import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsDto } from '../../model/credentials';
import { Person } from '../../model/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  loginError: boolean = false;
  registerError: boolean = false;

  constructor(private service: PersonService, private router: Router) {}

  active: string = 'register';

  onLoginTab(): void {
    this.active = 'login';
  }

  onRegisterTab(): void {
    this.active = 'register';
  }

  onSubmitLogin(form: NgForm): void {
    if (form.valid) {
      const credentials: CredentialsDto = {
        email: form.value.email,
        password: form.value.password,
      };

      this.service.onLogin(credentials).subscribe(
        (response) => {
          if (response && response.token) {
            this.router.navigate(['/auth-content']);
          }
        },
        (error) => {
          console.error('Login failed', error);
          this.loginError = true;
        }
      );
    }
  }

  onSubmitRegister(form: NgForm): void {
    if (form.valid) {
      const person: Person = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        password: form.value.password,
      };

      this.service.onRegister(person).subscribe(
        (response) => {
          if (response && response.token) {
            this.router.navigate(['/auth-content']);
          }
        },
        () => {
          this.registerError = true;
        }
      );
    }
  }
}
