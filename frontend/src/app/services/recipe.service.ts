import { Injectable } from '@angular/core';
import { AuthService, User } from "./auth.service"

export interface Recipe {
  username: string,
  title: string,
  ingredients: Array<{amount: string, ingredient: string, notes?: string}>
  instructions: Array<string>,
  nutrition: {
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  },
  halal: boolean,
  kosher: boolean,
  vegan: boolean,
  vegetarian: boolean,
  nutfree: boolean,
  description: string,
  rating: 1|2|3|4|5,
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
  name: string
}

export enum RecipeStatus {
  doesNotExist,
  unauthorized
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private auth: AuthService) {
    auth.currentUser.subscribe(_ => this.currentUser = _)
    for(let i = 0; i<20; i++) {
      this.create({
        username: "Diet Hunter Team",
        title: "Fried Garlic",
        ingredients: [{ amount: "6oz", ingredient: "Garlic", notes: "Sliced and diced" }],
        instructions: ["Fry the garlic."],
        nutrition: {
          calories: 200,
          fat: 5,
          protein: 0,
          carbs: 5
        },
        halal: true,
        kosher: true,
        vegan: true,
        vegetarian: true,
        nutfree: true,
        description: "Tasty meal to eat by yourself",
        rating: 4
      })
    }
  }

  public currentUser?: User

  public recipeCache = new Map<number, Recipe>()

  public create(details: Recipe) {
    this.recipeCache.set(this.recipeCache.size + 1, details)
  }

  public find(id: number) {
    let recipe = this.recipeCache.get(id)
    return recipe ? recipe : RecipeStatus.doesNotExist
  }

  public edit(id: number, details: Recipe) {
    let recipe = this.recipeCache.get(id)
    if(!recipe) {
      return RecipeStatus.doesNotExist
    } else if(recipe.username !== this.currentUser?.username!) {
      return RecipeStatus.unauthorized
    } else {
      this.recipeCache.set(id, { ...recipe, ...details })
      return
    }
  }

  public delete(id: number) {
    let recipe = this.recipeCache.get(id)
    if(!recipe) {
      return RecipeStatus.doesNotExist
    } else if(recipe.username !== this.currentUser?.username!) {
      return RecipeStatus.unauthorized
    } else {
      this.recipeCache.delete(id)
      return
    }
  }

  public search(details: RecipeSearchParams, page: number) {
    //Later add Database connection
    let entries = Array.from(this.recipeCache.entries())
    if(entries.length <= 0) {
      return RecipeStatus.doesNotExist
    }
    return {"page": entries.slice((page-1)*10, (page*10)-1), "pageamount": entries.length/10}
  }

  public all(page: number) {
    let entries = Array.from(this.recipeCache.entries())
    if(entries.length <= 0) {
      return RecipeStatus.doesNotExist
    }
    return {"page": entries.slice((page-1)*10, (page*10)-1), "pageamount": entries.length/10}
  }
}
