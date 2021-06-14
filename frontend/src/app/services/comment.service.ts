import { Injectable } from '@angular/core';
import {NbToastrService} from "@nebular/theme";
import {AuthService, User} from "./auth.service";

export interface Comment {
  recipeId: number,
  username: string,
  rating: 1|2|3|4|5,
  text: string
}

export enum CommentStatus {
  doesNotExist
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private toastr: NbToastrService,
              private auth: AuthService) {
    this.auth.currentUser.subscribe(_ => this.currentUser = _)
    for(let i = 0; i<5; i++) {
      this.create({
        recipeId: 1,
        username: "hi",
        rating: 4,
        text: "Good recipe"
      })
    }
  }

  private currentUser?: User

  private commentCache = new Map<number, Comment>()

  public create(details: Comment) {
      if(!this.currentUser) {
        return this.toastr.warning("Only logged in users can comment. How did you access this function anyway?!")
      } else {
        let alreadyCommented = false
        this.commentCache.forEach(comment => {
          if(comment.username !== this.currentUser!.username) {
            alreadyCommented = true
          }
        })
        return this.commentCache.set(this.commentCache.size+1, details)
      }
  }

  public findByRecipe(key: number) {
    let comments: Comment[] = [];
    this.commentCache.forEach(comment => {
      if(comment.recipeId == key) {
        comments.push(comment)
      }
    })
    if(comments.length > 0) {
      return comments.slice(0, 10)
    } else {
      return CommentStatus.doesNotExist
    }
  }
}
