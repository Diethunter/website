import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe, RecipeService, RecipeStatus} from "../../services/recipe.service";
import {Location} from "@angular/common";
import {AuthService, User} from "../../services/auth.service";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute,
              public recipeService: RecipeService,
              private location: Location,
              private auth: AuthService,
              private toastr: NbToastrService) { }

  public recipe: Recipe = {} as Recipe

  public confirmation: string = ""

  public delete() {
    this.recipeService.delete(this.id)
      .then(code => {
        if(code == RecipeStatus.doesNotExist) {
          this.toastr.warning("That recipe does not exist.")
          this.location.back()
        } else if(code == RecipeStatus.unauthorized) {
          this.toastr.warning("You do not have access to that recipe.")
          this.location.back()
        } else {
          this.toastr.success("Successfully deleted")
          this.location.back()
        }
      })
  }

  public currentUser?: User = this.auth.currentUser.value

  public id: number = 0

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    this.id = id
    this.recipeService.find(id)
      .then(recipe => {
        if(recipe !== RecipeStatus.doesNotExist && this.currentUser) {
          if(recipe == RecipeStatus.unauthorized) {
            this.location.back()
          } else {
            this.recipe = recipe as Recipe
          }
        } else {
          this.location.back()
        }
      })
  }

}
