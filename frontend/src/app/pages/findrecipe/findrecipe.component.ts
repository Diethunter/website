import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import { Recipe, RecipeService, RecipeStatus } from "../../services/recipe.service"

@Component({
  selector: 'app-findrecipe',
  templateUrl: './findrecipe.component.html',
  styleUrls: ['./findrecipe.component.css']
})
export class FindrecipeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  public recipe?: Recipe

  ngOnInit(): void {
    let recipeID = this.activatedRoute.snapshot.paramMap.get("id")
    if(!recipeID) {
      this.router.navigate(["dashboard"])
    }
    let recipe = this.recipeService.find(Number(recipeID))
    if(recipe == RecipeStatus.doesNotExist) {
      this.router.navigate(["/notfound"])
    } else {
      this.recipe = recipe as Recipe
    }
  }

}
