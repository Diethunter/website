import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
    NbToastrService,
    NbThemeModule,
    NbLayoutModule,
    NbButtonModule,
    NbActionsModule,
    NbInputModule,
    NbAlertModule,
    NbToastrModule,
    NbTreeGridModule,
    NbCheckboxModule,
    NbTagModule,
    NbToggleModule,
    NbCardModule,
    NbListModule,
    NbBadgeModule,
    NbIconModule,
} from "@nebular/theme"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { CoffeeComponent } from './pages/coffee/coffee.component';
import { AppdelayDirective } from './directives/appdelay.directive';
import { SearchresultsComponent } from './pages/searchresults/searchresults.component';
import { RatingComponent } from './components/rating/rating.component';
import { FindrecipeComponent } from './pages/findrecipe/findrecipe.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    SearchComponent,
    NotfoundComponent,
    CoffeeComponent,
    AppdelayDirective,
    AppdelayDirective,
    SearchresultsComponent,
    RatingComponent,
    FindrecipeComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({name: "default"}),
        NbLayoutModule,
        NbEvaIconsModule,
        NbButtonModule,
        NbActionsModule,
        ReactiveFormsModule,
        NbInputModule,
        NbAlertModule,
        NbToastrModule.forRoot(),
        FormsModule,
        NbTreeGridModule,
        NbCheckboxModule,
        NbTagModule,
        NbToggleModule,
        NbCardModule,
        NbListModule,
        NbBadgeModule,
        NbIconModule,
    ],
  providers: [NbToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
