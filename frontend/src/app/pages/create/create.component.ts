import { Component, OnInit } from '@angular/core';
import {NbToastrService} from "@nebular/theme";
import {FormBuilder, Validators} from "@angular/forms";
import {Recipe, RecipeInput, RecipeService} from "../../services/recipe.service";
import {AuthService, User} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(public toastr: NbToastrService,
              public fb: FormBuilder,
              public auth: AuthService,
              public recipeService: RecipeService,
              public router: Router) { }

  public ingredients: Array<{amount: string, ingredient: string, notes: string}> = [{amount: "", ingredient: "", notes: ""}]

  public instructions: Array<{val: string}> = [{val: ""}]

  public fields = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  })

  public checkedBoxes = {
    halal: false,
    kosher: false,
    nutfree: false
  }

  public currentUser?: User = this.auth.currentUser.value

  ngOnInit(): void {
  }

  public submit() {
    let data: RecipeInput = {
      title: this.fields.get("title")!.value,
      description: this.fields.get("description")!.value,
      instructions: this.instructions.map(_ => _.val),
      ingredients: this.ingredients,
      ...this.checkedBoxes
    }
    this.recipeService.create(data)
      .then(id => {
        if(id) {
          this.router.navigate(["recipe", id])
        } else {
          this.toastr.danger("An unexpected error occurred.")
        }
      })
      .catch(console.log)
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
