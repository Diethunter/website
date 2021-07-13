import { Component, OnInit } from '@angular/core';
import {AuthService, User} from './services/auth.service'
import {NbThemeService} from "@nebular/theme";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService,
              private themeService: NbThemeService) {
    this.themeService.changeTheme(this.theme)
  }

  public currentUser? = {} as User

  public copyrightYear = (new Date()).getFullYear()

  public theme:"default"|"dark"|"cosmic" = localStorage.getItem("theme") as "default"|"dark"|"cosmic" || "dark"

  public signOut() {
    return
  }

  public production = environment.production

  public ngOnInit() {
    this.auth.currentUser.subscribe(_ => this.currentUser = _)
  }

  public changeTheme() {
    if(this.theme == "default") {
      this.theme = "dark"
    } else if(this.theme == "dark") {
      this.theme = "cosmic"
    } else if(this.theme == "cosmic") {
      this.theme = "default"
    }
    this.themeService.changeTheme(this.theme)
    localStorage.setItem("theme", this.theme)
  }
}
