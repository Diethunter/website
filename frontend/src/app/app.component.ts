import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService) {}

  public isLoggedIn?: boolean

  public currentUser?: {username: string, name: string}

  public copyrightYear = (new Date()).getFullYear()

  public signOut() {
    return
  }

  public ngOnInit() {
    this.auth.isLoggedIn.subscribe(
      login => this.isLoggedIn = login
    )
    this.auth.currentUser.subscribe(
      user => this.currentUser = user
    )
  }
}
