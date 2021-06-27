import {Component, OnInit} from '@angular/core';
import {NbToastrService} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService, User} from "../../services/auth.service";
import {Recipe, RecipeInput, RecipeService, RecipeStatus} from "../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public toastr: NbToastrService,
              public fb: FormBuilder,
              public auth: AuthService,
              public recipeService: RecipeService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              private location: Location) { }


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
        this.ingredients = this.recipe.ingredients
        this.instructions = this.recipe.instructions.map(_ => { return {val:_}})
        this.fields = this.fb.group({
          title: [this.recipe.title, Validators.required],
          description: [this.recipe.description, Validators.required]
        })
        this.checkedBoxes.halal = this.recipe.halal
        this.checkedBoxes.kosher = this.recipe.kosher
        this.checkedBoxes.nutfree = this.recipe.nutfree
      })
  }

  public recipe: Recipe = {} as Recipe

  public ingredients: Array<{amount: string, ingredient: string, notes?: string}> = []

  public instructions: Array<{val: string}> = []

  public fields: FormGroup = this.fb.group({
    title: [this.recipe.title, Validators.required],
    description: [this.recipe.description, Validators.required]
  })

  public checkedBoxes = {
    halal: this.recipe.halal,
    kosher: this.recipe.kosher,
    nutfree: this.recipe.nutfree
  }

  public currentUser?: User = this.auth.currentUser.value

  public id: number = 0

  public submit() {
    let data: RecipeInput = {
      title: this.fields.get("title")!.value,
      description: this.fields.get("description")!.value,
      instructions: this.instructions.map(_ => _.val),
      ingredients: this.ingredients,
      ...this.checkedBoxes
    }
    this.recipeService.edit(this.id, data)
      .then(id => {
        if(id == RecipeStatus.unauthorized) {
          this.toastr.danger("You do not have access to this recipe.")
        } else if(id == RecipeStatus.doesNotExist) {
          this.toastr.danger("An unexpected error occurred.")
        } else {
          this.router.navigate(["recipe", id])
        }
      })
  }

  public addIngredient() {
    let ingredient = this.ingredients[this.ingredients.length-1]
    if(ingredient) {
      if(!ingredient.ingredient || !ingredient.amount) {
        this.toastr.warning("Ingredients must have an Amount and Name.")
      } else {
        this.ingredients.push({ amount: "", ingredient: "", notes: ""})
      }
    } else {
      this.toastr.warning("Ingredients must have an Amount and Name.")
    }
  }

  public addInstruction() {
    let instruction = this.instructions[this.instructions.length-1]
    if(instruction) {
      this.instructions.push({val: ""})
    } else {
      this.toastr.warning("An instruction cannot be empty.")
    }
  }
}
