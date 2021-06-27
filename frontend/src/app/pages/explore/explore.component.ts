import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import { Recipe, RecipeSearchParams, RecipeService, RecipeStatus } from "../../services/recipe.service"
import { NbToastrService } from "@nebular/theme"
import {Location} from "@angular/common";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              public router: Router,
              private recipeService: RecipeService,
              private toastr: NbToastrService,
              private location: Location) {  }

  public results?: Array<Recipe>

  public pagenumber: number = 1

  public pageamount: number = 1

  public searchPage() {
    this.recipeService.all(this.pagenumber)
      .then(results => {
        if(results !== RecipeStatus.doesNotExist) {
          this.results = (results as { page: Recipe[]; pageamount: number; }).page
          this.pageamount = (results as { page: Recipe[]; pageamount: number; }).pageamount
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {page: this.pagenumber},
            queryParamsHandling: "merge"
          })
        } else {
          this.router.navigate(["/notfound"])
          this.toastr.warning("No recipes found.")
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
      if(_.page) {
        this.pagenumber = Number(_.page)
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
