import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnthropometricsFormComponent } from './components/anthropometrics-form/anthropometrics-form.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { PdfModalComponent } from './components/pdf-modal/pdf-modal.component';
import { PasswordUpdateFormComponent } from './components/password-update-form/password-update-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AnthropometricsFormComponent,
    HomepageComponent,
    LoginFormComponent,
    AuthContentComponent,
    NavBarComponent,
    FooterComponent,
    InfoModalComponent,
    PdfModalComponent,
    PasswordUpdateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
