import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import { Recipe, RecipeSearchParams, RecipeService, RecipeStatus } from "../../services/recipe.service"
import { NbToastrService } from "@nebular/theme"

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              public router: Router,
              private recipeService: RecipeService,
              private toastr: NbToastrService) {  }

  public results?: Array<[number, Recipe]>

  public pagenumber: number = 1

  public pageamount: number = 1

  public searchPage() {
    let results = this.recipeService.search(this.state!, this.pagenumber)
    if(results !== RecipeStatus.doesNotExist) {
      this.results = results.page
      this.pageamount = results.pageamount
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {page: this.pagenumber},
        queryParamsHandling: "merge"
      })
    } else {
      this.router.navigate(["/search"])
      this.toastr.warning("No recipes matched those parameters.")
    }
  }

  public nextPage() {
    this.pagenumber++
    window.scrollBy(0,-9999)
    this.searchPage()
  }

  public state?: RecipeSearchParams

  ngOnInit(): void {
    let state
    this.activatedRoute.queryParams.subscribe(_ => {
      state = _
      if(_.page) {
        this.pagenumber = Number(_.page)
      } else {
        this.router.navigate(["search"])
      }
    })
    if(!state) {
      this.router.navigate(["search"])
    } else {
      this.searchPage()
    }
  }

}
