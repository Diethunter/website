import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router"
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.isLoggedIn.subscribe(_ => this.isLoggedIn = _)
  }

  public isLoggedIn?: boolean

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isLoggedIn) {
      return true
    } else {
      return this.router.parseUrl("/login")
    }
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isLoggedIn) {
      return this.router.parseUrl("/dashboard")
    } else {
      return true
    }
  }

}
