import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import { Recipe, RecipeSearchParams, RecipeService, RecipeStatus } from "../../services/recipe.service"
import { NbToastrService } from "@nebular/theme"
import {Location} from "@angular/common";

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              public router: Router,
              private recipeService: RecipeService,
              private toastr: NbToastrService,
              private location: Location) {  }

  public results?: Array<Recipe>

  public pagenumber: number = 1

  public pageamount: number = 1

  public searchPage() {
    this.recipeService.search(this.state!, this.pagenumber)
      .then(results => {
        if(results !== RecipeStatus.doesNotExist) {
          this.results = (results as { page: Recipe[], pageamount: number}).page
          this.pageamount = (results as { page: Recipe[], pageamount: number}).pageamount
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {page: this.pagenumber},
            queryParamsHandling: "merge"
          })
        } else {
          this.location.back()
          this.toastr.warning("No recipes matched those parameters.")
        }
      })
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
      this.state = this.recipeService.state
      if(state.page) {
        this.pagenumber = Number(state.page)
      } else {
        this.location.back()
      }
    })
    if(!state) {
      this.location.back()
    } else {
      this.searchPage()
    }
  }

}
