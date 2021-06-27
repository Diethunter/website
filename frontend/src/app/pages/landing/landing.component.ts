import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.auth.currentUser.value) {
      this.router.navigate(["dashboard"])
    }
  }

  public logInWithGoogle() {
    this.auth.signInOauth()
  }

}
