import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnthropometricsService } from '../../services/anthropometrics.service';
import { AuthService } from '../../services/auth.service';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  isAuthenticated!: boolean;
  isCollapsed : boolean = true;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.service.isAuthenticated$.subscribe(status => {
      this.isAuthenticated = status;
    })
  }

  logOut(){
    this.service.onLogOut();
    this.router.navigate(['/'])
  }
}
