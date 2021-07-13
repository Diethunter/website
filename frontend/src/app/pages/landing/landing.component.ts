import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router,
              private recipeService: RecipeService,
              ) { }

  ngOnInit(): void {
    if(this.auth.currentUser.value) {
      this.router.navigate(["dashboard"])
    }
  }

  public recipeName: string = ""

  public logInWithGoogle() {
    this.auth.signInOauth()
  }

  public search() {
    this.router.navigate(["/results"], {
      queryParams: {page: 1},
    })
    this.recipeService.state = {name: this.recipeName}
    return
  }

}
