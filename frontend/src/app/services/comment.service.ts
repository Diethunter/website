import { Injectable } from '@angular/core';
import {NbToastrService} from "@nebular/theme";
import {AuthService, User} from "./auth.service";
import {RecipeService} from "./recipe.service";
import axios from "axios";

export interface Comment {
  recipeId: number,
  user: {username: string},
  rating: 1|2|3|4|5,
  text: string,
  created_at?: string
}

export enum CommentStatus {
  doesNotExist
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private toastr: NbToastrService,
              private auth: AuthService,
              private recipeService: RecipeService) { }

  private currentUser?: User = this.auth.currentUser.value

  public create(details: Comment) {
    return axios.post("api/recipes/comment/"+details.recipeId, {
      text: details.text,
      rating: details.rating
    }, {
      headers: {
        Authorization: "Bearer " + this.currentUser!.oatToken.token
      }
    })
      .then(_ => undefined)
      .catch(error => {
        switch (error.response.status) {
          case(404):
            return CommentStatus.doesNotExist
          case(422):
            return this.toastr.warning("You can't comment on the same recipe twice.")
          case(401):
            return this.auth.signOut()
        }
        return
      })

  }
}
