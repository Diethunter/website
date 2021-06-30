import {Component, OnInit} from '@angular/core';
import {AuthService, User} from "../../services/auth.service"
import {Recipe, RecipeService, RecipeStatus} from "../../services/recipe.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private recipeService: RecipeService
  ) { }

  public currentUser?: User = this.auth.currentUser.value

  public recipes: Recipe[] = []

  ngOnInit(): void {
    this.recipeService.getRecipesByUser()
      .then(recipes => {
        console.log("Recipes is ", recipes)
        this.recipes = recipes
      })
  }

}
