import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Recipe} from "../../services/recipe.service";

@Component({
  selector: 'app-own-recipe',
  templateUrl: './own-recipe.component.html',
  styleUrls: ['./own-recipe.component.css']
})
export class OwnRecipeComponent implements OnInit {

  constructor(public router: Router,
  ) { }

  @Input() recipe: Recipe = {} as Recipe

  public isHovered = false

  public delete() {
    this.router.navigate(["delete", this.recipe.id])
  }

  public edit() {
    this.router.navigate(["edit", this.recipe.id])
  }

  ngOnInit(): void {
  }
}
