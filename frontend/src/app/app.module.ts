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
    NbIconModule, NbSelectModule, NbFormFieldModule, NbTooltipModule,
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
import { RecipeResultComponent } from './components/recipe-result/recipe-result.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { UserlinkComponent } from './components/userlink/userlink.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { RequiredComponent } from './components/required/required.component';
import { OwnRecipeComponent } from './components/own-recipe/own-recipe.component';

import {HttpClientModule} from "@angular/common/http";
import {GoogleLoginProvider, SocialLoginModule} from "angularx-social-login";
import {environment} from "../environments/environment";

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
    RecipeResultComponent,
    ExploreComponent,
    UserlinkComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent,
    RequiredComponent,
    OwnRecipeComponent,
  ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({name: "dark"}),
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
        NbSelectModule,
        NbFormFieldModule,
        NbTooltipModule,
        HttpClientModule,
        SocialLoginModule
    ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.client_id)
          }
        ]
      }
    },
    NbToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
