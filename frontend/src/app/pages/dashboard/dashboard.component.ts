import { Component, OnInit } from '@angular/core';
import { AuthService, User } from "../../services/auth.service"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  public currentUser?: User

  ngOnInit(): void {
    this.auth.currentUser.subscribe(_ => this.currentUser = _)
  }

}
