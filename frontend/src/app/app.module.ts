import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbToastrService, NbThemeModule, NbLayoutModule, NbButtonModule, NbActionsModule, NbInputModule, NbAlertModule, NbToastrModule } from '@nebular/theme'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbActionsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbAlertModule,
    NbToastrModule.forRoot()
  ],
  providers: [NbToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
