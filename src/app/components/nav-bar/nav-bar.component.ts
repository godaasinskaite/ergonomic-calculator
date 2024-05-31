import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  isCollapsed: boolean = true;

  constructor(private service: AuthService, private router: Router) {}

  logOut() {
    this.service.onLogOut();
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.service.isAuthenticated();
  }

  moveToMenu() {
    this.router.navigate(['/auth-content']);
  }
}
