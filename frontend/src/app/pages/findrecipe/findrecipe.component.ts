import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import { Recipe, RecipeService, RecipeStatus } from "../../services/recipe.service"
import {AuthService, User} from "../../services/auth.service";
import {CommentService, CommentStatus, Comment} from "../../services/comment.service";
import {NbToastRef, NbToastrService} from "@nebular/theme";

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
              private toastr: NbToastrService) { }

  public recipe?: Recipe

  public currentUser?: User

  public commentRating: 1|2|3|4|5|"title" = "title"

  public commentText: string = ""

  public comment() {
    let comment = {
      username: this.currentUser!.username,
      recipeId: this.recipeId,
      rating: this.commentRating as 1|2|3|4|5,
      text: this.commentText,
      date: new Date()
    }
    let create = this.commentService.create(comment)
    if(create == CommentStatus.doesNotExist) {
      return this.toastr.warning("That recipe does not exist.")
    } else if(!(create instanceof NbToastRef)) {
      this.comments.unshift(comment)
      this.commentRating = "title"
      this.commentText = ""
      return
    } else {
      return
    }
  }

  public comments: Comment[] = []

  public recipeId: number = 0

  ngOnInit(): void {
    this.auth.currentUser.subscribe(_ => this.currentUser = _)

    let recipeID = this.activatedRoute.snapshot.paramMap.get("id")
    if(!recipeID) {
      this.router.navigate(["dashboard"])
    } else {
      this.recipeId = Number(recipeID)
      let recipe = this.recipeService.find(Number(recipeID))
      if(recipe == RecipeStatus.doesNotExist) {
        this.router.navigate(["/notfound"])
      } else {
        this.recipe = recipe as Recipe
        this.comments = this.commentService.findByRecipe(this.recipeId) as Comment[]
      }
    }
  }

}
