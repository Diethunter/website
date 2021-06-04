import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from "./pages/landing/landing.component"
import { LoginComponent } from './pages/login/login.component'
import { SignupComponent } from './pages/signup/signup.component'
import { AuthGuard } from "./guards/auth.guard"
import { DashboardComponent } from "./pages/dashboard/dashboard.component"
import { SearchComponent } from "./pages/search/search.component"

const routes: Routes = [
  { path:"", component: LandingComponent},
  { path:"search", component: SearchComponent},
  { path:"login", component: LoginComponent},
  { path:"signup", component: SignupComponent},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
