import {Injectable, NgZone} from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Router } from "@angular/router"
import axios from "axios";
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {environment} from "../../environments/environment";


export enum AuthCodes {
  usernameTaken,
  incorrectPassword ,
  success,
  userDoesNotExist
}

export interface User {
  username: string,
  name: string,
  oatToken: ApiToken
}

export interface ApiToken {
  type: string
  token: string
  expires_at?: string | undefined
  expires_in?: number | undefined
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private socialAuth: SocialAuthService
  ) {
    this.currentUser.subscribe(user => {
      localStorage.setItem("currentuser", user? JSON.stringify(user) : "")
    })
  }

  public signInOauth() {
    return this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(user => {
        return axios.post<ApiToken & {username: string, name: string}>(environment.base_url + "/auth/oauth", {
          username: user.email.split("@")[0],
          name: user.name,
          accessToken: user.id
        })
      })
      .then(token => {
        this.currentUser.next({
          username: token.data.username, name: token.data.name, oatToken: token.data
        })
      })
      .then(() => this.router.navigate(["dashboard"]))
  }

  private storedUser = localStorage.getItem("currentuser")

  public currentUser = new BehaviorSubject<User|undefined>(this.storedUser ? JSON.parse(this.storedUser) : undefined)

  public signOut(): void {
    this.currentUser.next(undefined)
    this.router.navigate(["/"])
    return
  }

  public signUp(username: string, name: string, password: string): Promise<AuthCodes> {
    return axios.post<ApiToken>(environment.base_url+"/auth/register", { username, name, password})
      .then(token => {
        this.currentUser.next({
          username, name, oatToken: token.data
        })
        return AuthCodes.success
      })
      .catch(() => {
        return AuthCodes.usernameTaken
    })
  }

  public attempt(username: string, password: string): Promise<AuthCodes> {

    return axios.post<ApiToken & {name: string}>(environment.base_url+"/auth/login", {
      username, password
    })
      .then(token => {
        this.currentUser.next({
          username, name: token.data.name, oatToken: token.data
        })
        return AuthCodes.success
      })
      .catch(error => {
        return AuthCodes.userDoesNotExist
      })
  }
}
