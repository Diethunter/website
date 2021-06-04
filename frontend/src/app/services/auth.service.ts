import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Router } from "@angular/router"


export enum AuthCodes {
  usernameTaken,
  incorrectPassword ,
  success,
  userDoesNotExist
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  public inMemoryCache = new Map<string, {name: string, password: string}>()

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  public currentUser = new BehaviorSubject<{username: string; name: string}|undefined>(undefined)

  public signOut(): void {
    this.isLoggedIn.next(false)
    this.currentUser.next(undefined)
    this.router.navigate(["/"])
    return
  }

  public signUp(username: string, name: string, password: string): AuthCodes {
    if (this.inMemoryCache.get(username)) {
      //If a user with the same username exists, then send error
      return AuthCodes.usernameTaken
    } else {
      this.inMemoryCache.set(username, {name, password})
      this.isLoggedIn.next(true)
      this.currentUser.next({username, name})
      return AuthCodes.success
    }
  }

  public attempt(username: string, password: string): AuthCodes {
    //Get user from memory
    let user = this.inMemoryCache.get(username)
    if(!user) {
      //If user does not exist, send error
      this.isLoggedIn.next(false)
      return AuthCodes.userDoesNotExist
    } else if(user.password == password) {
      //If username and password match login
      this.isLoggedIn.next(true)
      this.currentUser.next({username, name: user.name})
      return AuthCodes.success
    } else {
      //Else fail
      return AuthCodes.incorrectPassword
    }

  }
}
