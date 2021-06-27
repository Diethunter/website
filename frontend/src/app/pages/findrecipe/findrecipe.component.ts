import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import { Recipe, RecipeService, RecipeStatus } from "../../services/recipe.service"
import {AuthService, User} from "../../services/auth.service";
import {CommentService, CommentStatus, Comment} from "../../services/comment.service";
import {NbToastRef, NbToastrService} from "@nebular/theme";
import {Location} from "@angular/common";
import {DateTime} from 'luxon'

@Component({
  selector: 'app-findrecipe',
  templateUrl: './findrecipe.component.html',
  styleUrls: ['./findrecipe.component.css']
})
export class FindrecipeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private auth: AuthService,
              public commentService: CommentService,
              private toastr: NbToastrService,
              private location: Location) {

    let recipeID = this.activatedRoute.snapshot.paramMap.get("id")
    if(!recipeID) {
      this.location.back()
    } else {
      this.recipeId = Number(recipeID)
      this.recipeService.find(Number(recipeID))
        .then(recipe => {
          if(recipe == RecipeStatus.doesNotExist) {
            this.router.navigate(["/notfound"])
          } else {
            this.recipe = recipe as Recipe
            this.comments = (recipe as Recipe).comments
            this.cuisine = this.recipeService.formatCuisine((recipe as Recipe).cuisine)
          }
        })
    }
  }

  public recipe?: Recipe = {} as Recipe

  public luxon = DateTime

  public cuisine: string = ""

  public currentUser?: User = this.auth.currentUser.value

  public commentRating: 1|2|3|4|5|"title" = "title"

  public commentText: string = ""

  public comment() {
    let comment = {
      user: {username: this.currentUser!.username},
      recipeId: this.recipeId,
      rating: this.commentRating as 1|2|3|4|5,
      text: this.commentText,
      created_at: DateTime.now().toISO()
    }
    this.commentService.create(comment)
      .then(create => {
        if(create == CommentStatus.doesNotExist) {
          return this.toastr.warning("That recipe does not exist.")
        } else if(!(create instanceof NbToastRef)) {
          this.comments.unshift(comment)
          this.commentRating = "title"
          this.commentText = ""
          return this.toastr.success("Success!")
        } else {
          return
        }
      })
  }

  public comments: Comment[] = []

  public recipeId: number = 0

  public expand = false

  ngOnInit(): void {

  }

}
