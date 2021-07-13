import { Component } from "@angular/core"
import {Cuisines, RecipeService} from "../../services/recipe.service"
import { NbTagComponent, NbTagInputAddEvent, NbToastrService } from "@nebular/theme"
import { FormBuilder } from "@angular/forms"
import { Router } from "@angular/router"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private recipeService: RecipeService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: NbToastrService) {
    for(let item in Cuisines) {
      if(isNaN(Number(item))) {
        this.cuisineList.push(item.replace("_", " "))
      }
    }
  }

  public advanced: boolean = false

  public localStorage = localStorage

  public cuisineList: string[] = []

  public search() {
    let data
    if(this.advanced) {
      data = {
        ...this.searchForm.value,
        ...this.checkedBoxes,
        include: Array.from(this.includeTree.values()),
        exclude: Array.from(this.excludeTree.values()),
        cuisine: this.cuisine
      }
    } else {
      data = {
        name: this.searchForm.value.name,
        ...this.checkedBoxes,
        cuisine: this.cuisine
      }
    }
    console.log(data)
    localStorage.setItem("cuisine", this.cuisine ? this.cuisine : "")
    let isFormOk = false;
    for(let i of Object.keys(data)) {
      localStorage.setItem(i, typeof data[i] == "string" ? data[i] : JSON.stringify(data[i]))
      if(Array.isArray(data[i])) {
        if(data[i].length) {
          isFormOk = true
          break
        } else {

        }
      } else if(data[i]) {
        isFormOk = true
        break
      } else {

      }
    }
    if(isFormOk) {
      this.router.navigate(["/results"], {
        queryParams: {page: 1},
      })
      this.recipeService.state = data
    } else {
      this.toastr.danger("You cannot search with no parameters.")
    }
  }

  public searchForm = this.fb.group({
    name:[""],
    minCalories: [Number(localStorage.getItem("minCalories")) || undefined],
    maxCalories: [Number(localStorage.getItem("maxCalories")) || undefined],
    minFat: [Number(localStorage.getItem("minFat")) || undefined],
    maxFat: [Number(localStorage.getItem("maxFat")) || undefined],
    minCarbs: [Number(localStorage.getItem("minCarbs")) || undefined],
    maxCarbs: [Number(localStorage.getItem("maxCarbs")) || undefined],
    minProtein: [Number(localStorage.getItem("minProtein")) || undefined],
    maxProtein: [Number(localStorage.getItem("maxProtein")) || undefined]
  })

  public checkedBoxes = {
    halal: (localStorage.getItem("halal") === 'true') || false,
    kosher: (localStorage.getItem("kosher") === 'true') || false,
    vegetarian: (localStorage.getItem("vegetarian") === 'true') || false,
    vegan: (localStorage.getItem("vegan") === 'true') || false,
    nutfree: (localStorage.getItem("nutfree") === 'true') || false
  }

  public includeTree: Set<string | undefined> = new Set(JSON.parse(localStorage.getItem("include") || "[]"))

  public excludeTree: Set<string | undefined> = new Set(JSON.parse(localStorage.getItem("exclude") || "[]"))

  public cuisine: string = localStorage.getItem("cuisine") || ""

  public onIncludeTagRemove(tagToRemove: NbTagComponent): void {
    this.includeTree.delete(tagToRemove.text);
  }

  public onIncludeTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.includeTree.add(value)
    }
    input.nativeElement.value = '';
  }

  public onExcludeTagRemove(tagToRemove: NbTagComponent): void {
    this.excludeTree.delete(tagToRemove.text);
  }

  public onExcludeTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.excludeTree.add(value)
    }
    input.nativeElement.value = '';
  }

}
