import { Component, Input, OnInit } from "@angular/core"
import { RecipeService } from "../../services/recipe.service"
import { NbTagComponent, NbTagInputAddEvent, NbToastrService } from "@nebular/theme"
import { FormBuilder, Validators } from "@angular/forms"
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
              private toastr: NbToastrService) { }

  public advanced: boolean = false

  public search() {
    const data = {
      ...this.searchForm.value,
      ...this.checkedBoxes,
      ...this.includeTree,
      ...this.excludeTree
    }
    let isFormOk = false;
    for(let i of Object.keys(data)) {
      if(data[i]) {
        isFormOk=true
        break
      }
    }
    if(isFormOk) {
      this.router.navigate(["/results"], {
        queryParams: {page: 1, ...data},
      })
    } else {
      this.toastr.danger("You cannot search with no parameters.")
    }
  }

  public searchForm = this.fb.group({
    name:[''],
    minCalories: [''],
    maxCalories: [''],
    minFat: [''],
    maxFat: [''],
    minCarbs: [''],
    maxCarbs: [''],
    minProtein: [''],
    maxProtein: ['']
  })

  public checkedBoxes = {
    halal: false,
    kosher: false,
    vegetarian: false,
    vegan: false,
    nutfree: false
  }

  public includeTree: Set<string | undefined> = new Set()

  public excludeTree: Set<string | undefined> = new Set()

  public onIncludeTagRemove(tagToRemove: NbTagComponent): void {
    this.includeTree.delete(tagToRemove.text);
  }

  public onIncludeTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.includeTree.add(value)
    }
    input.nativeElement.value = '';
  }

  public ExcludeTagRemove(tagToRemove: NbTagComponent): void {
    this.excludeTree.delete(tagToRemove.text);
  }

  public onExcludeTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.excludeTree.add(value)
    }
    input.nativeElement.value = '';
  }

}
