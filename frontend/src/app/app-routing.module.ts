import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from "./pages/landing/landing.component"
import { LoginComponent } from './pages/login/login.component'
import { SignupComponent } from './pages/signup/signup.component'

const routes: Routes = [
  { path:"", component: LandingComponent },
  { path:"login", component: LoginComponent},
  { path:"signup", component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
