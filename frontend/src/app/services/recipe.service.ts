import { Injectable } from '@angular/core';
import { AuthService, User } from "./auth.service"
import axios from "axios";
import {Comment} from "./comment.service";

export enum Cuisines {
  African,
  American,
  British,
  Cajun,
  Caribbean,
  Chinese,
  Eastern_European,
  European,
  French,
  German,
  Greek,
  Indian,
  Irish,
  Italian,
  Japanese,
  Jewish,
  Korean,
  Latin_American,
  Mediterranean,
  Mexican,
  Middle_Eastern,
  Nordic,
  Southern,
  Spanish,
  Thai,
  Vietnamese,
}

export interface Recipe {
  id: number,
  user: {
    username: string,
    name: string
  }
  title: string,
  ingredients: Array<{amount: string, ingredient: string, notes?: string}>
  instructions: Array<string>,
  nutrition: {
    name: string,
    unit: string,
    amount: number
  }[],
  halal: boolean,
  kosher: boolean,
  vegan: boolean,
  vegetarian: boolean,
  nutfree: boolean,
  description: string,
  rating: 1|2|3|4|5,
  cuisine: string,
  comments: Comment[]
}

export interface RecipeInput {
  title: string,
  ingredients: Array<{amount: string, ingredient: string, notes?: string}>
  instructions: Array<string>,
  halal: boolean,
  kosher: boolean,
  nutfree: boolean,
  description: string,
}

export interface RecipeSearchParams {
  minCalories: number,
  maxCalories: number,
  minProtein: number,
  maxProtein: number,
  minCarbs: number,
  maxCarbs: number,
  minFat: number,
  maxFat: number,
  halal: boolean,
  kosher: boolean,
  vegetarian: boolean,
  vegan: boolean,
  nutfree:boolean,
  exclude: Array<string>,
  include: Array<string>,
  cuisine: string,
  name: string
}

export enum RecipeStatus {
  doesNotExist=-1,
  unauthorized=-2
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private auth: AuthService) {
    this.auth.currentUser.subscribe(_ => this.currentUser = _)
  }

  public state = {} as RecipeSearchParams

  public getRecipesByUser(): Promise<Recipe[]> {
    return axios.get("/api/auth/profile",{
      headers: {
        Authorization: "Bearer " + this.currentUser!.oatToken.token
      }
    })
      .then(user => {
        let recipes = user.data.recipes.map((recipe: any) => recipe)
        if(recipes.length) {
          return recipes
        } else {
          return RecipeStatus.doesNotExist
        }
      })
      .catch(error => {
        if(error.response.status == 401) {
          this.auth.signOut()
        }
      })
  }

  public formatCuisine(name: string): string {
    return name.replace("_", " ")
  }

  public currentUser?: User

  public create(details: RecipeInput): Promise<number | void> {
    return axios.post<number>("/api/recipes/new", details, {
      headers: {
        Authorization: "Bearer " + this.currentUser!.oatToken.token
      }
    })
      .then(res => {
        return res.data
      })
      .catch(error => {
        if(error.response.status == 401) {
          this.auth.signOut()
        }
      })
  }

  public find(id: number): Promise<Recipe | RecipeStatus> {
    return axios.get("/api/recipes/"+id)
      .then(recipe => {
        return recipe.data
      })
      .catch(() => {
        return RecipeStatus.doesNotExist
      })
  }

  public edit(id: number, details: RecipeInput): Promise<number | RecipeStatus> {
    return axios.put("/api/recipes/edit/"+id, details, {
      headers: {
        Authorization: "Bearer " + this.currentUser!.oatToken.token
      }
    })
      .then(id => {
        return id.data
      })
      .catch(error => {
        if(error.response.status == 404) {
          return RecipeStatus.doesNotExist
        } else {
          return RecipeStatus.unauthorized
        }
      })
  }

  public delete(id: number): Promise<RecipeStatus | undefined | void> {
    return axios.delete("api/recipes/delete/"+id, {
      headers: {
        Authorization: "Bearer " + this.currentUser!.oatToken.token
      }
    })
      .then(_ => undefined)
      .catch(error => {
        if (error.response.status == 404) {
          return RecipeStatus.doesNotExist
        } else if(error.response.status == 401) {
          return this.auth.signOut()
        } else {
          return RecipeStatus.unauthorized
        }
      })
  }

  public search(details: RecipeSearchParams, page: number): Promise<{page: Recipe[], pageamount: number} | RecipeStatus> {
    return axios.post<Recipe[]>("api/recipes/search", {...details, page})
      .then(_ => {
        return {page: _.data, pageamount: _.headers["x-page-amount"]}
      })
      .catch(e => RecipeStatus.doesNotExist)
  }

  public all(page: number): Promise<{page: Recipe[], pageamount: number} | RecipeStatus> {
    return axios.get<Recipe[]>("api/recipes/explore?page="+page)
      .then(_ => {
        return {page: _.data, pageamount: _.headers["x-page-amount"]}
      })
      .catch(e => RecipeStatus.doesNotExist)
  }
}
