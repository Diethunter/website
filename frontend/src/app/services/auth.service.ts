import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
      this.isLoggedIn.next(true)
  }

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false) as BehaviorSubject<boolean>
}
