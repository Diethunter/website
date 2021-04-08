import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RecipesController {

  /*
  * Creates a new recipe.
  * Route: POST /recipe/new
  *
  * @param token {ApiToken} API token for user auth
  * @param title {string} A name for the recipe
  * @param ingredients {Ingredient[]} Ingredients and amounts for the recipe
  * @param instructions {string[]} Sequential instructions for cooking the recipe
  * @param halal {boolean} Whether the recipe is halal
  * @param kosher {boolean} Whether the recipe is kosher
  *
  * @return id {number} A unique ID to identify the recipe
  */
  public async create({ request, auth }: HttpContextContract): Promise<number> {

  }

}
