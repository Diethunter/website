import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from "../../services/auth.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  private isLoggedIn?: boolean

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe(_ => this.isLoggedIn = _)
    if(this.isLoggedIn) {
      this.router.navigate(["/"])
    }
  }

}
