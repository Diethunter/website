import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false) as BehaviorSubject<boolean>

  public attempt(username: string, password: string): boolean {
    //Auto log in for now
    this.isLoggedIn.next(true)
    return true
  }
}
