import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { AnthropometricsFormComponent } from './components/anthropometrics-form/anthropometrics-form.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'anthropometric-form', component: AnthropometricsFormComponent },
  { path: 'login-form', component: LoginFormComponent },
  {
    path: 'auth-content',
    component: AuthContentComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
