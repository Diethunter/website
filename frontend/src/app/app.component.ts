import { Component, OnInit } from '@angular/core';
import { AuthService } from "./services/auth.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}

  public isLoggedIn: boolean = true

  ngOnInit() {
    this.auth.isLoggedIn.subscribe(
      login => this.isLoggedIn = login
    )
  }
}
