import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recipe from 'App/Models/Recipe'

export default class RecipesController {
	/**
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
	public async create({ request, auth }: HttpContextContract): Promise<number> {}

	/**
	 * Find a recipe by ID.
	 * Route: GET /recipe/:id
	 *
	 * @param id {number} Unique recipe ID
	 *
	 * @return recipe {Recipe | Error } The recipe the ID refers to if it exists
	 */

	public async find({ request }: HttpContextContract): Promise<Object> {}

	/**
	 * Search for a recipe with constraints
	 * Route:	POST /recipe/search
	 *
	 * @param minCalories {number} Minimum amount of calories
	 * @param maxCalories {number} Maximum amount of calories
	 * @param minerals {Mineral[]} Minerals required in the recipe
	 * @param minProtein {number} Minimum amount of protein in grams
	 * @param maxProtein {number} Maximum amount of protein in grams
	 * @param minCarbs {number} Minimum amount of carbohydrates in grams
	 * @param maxCarbs {number} Maximum amount of carbohydrates in grams
	 * @param halal {boolean} If a recipe must be halal-friendly
	 * @param kosher {boolean} If a recipe must be kosher-friendly
	 * @param exclude {Ingredient[]} Exclude a certain ingredient i.e. for Allergies
	 * @param include {Ingredient[]} Ingredients that must be in the recipe
	 *
	 * @return Recipes {Recipe[] | Error} Recipes matching the constraints
	 */

	public async search({ request }: HttpContextContract): Promise<Object[]> {}

	/**
	 * Comment on a recipe
	 * Route: POST /recipe/comment/:id
	 * @param token {ApiToken} Login token
	 * @param text {string} Your comment on the recipe
	 * @param id {number} The recipe ID
	 * @return success {“Success” | “Failure”} If the message was a success
	 */

	public async comment({ request, auth }: HttpContextContract): Promise<'Success' | 'Failure'> {}

	/**
	 * Edit a recipe
	 * Route: PUT /recipe/edit/:id
	 *
	 * @param token {ApiToken} Login token
	 * @param id {number} The recipe ID
	 * @param title? {string} A name for the recipe
	 * @param ingredients? {Ingredient[]} Ingredients and amounts for the recipe
	 * @param instructions? {string[]} Sequential instructions for cooking the recipe
	 * @param halal? {boolean} Whether the recipe is halal
	 * @param kosher? {boolean} Whether the recipe is kosher
	 *
	 * @return success {“Success” | “Failure”} If the edit was a success
	 *
	 */

	public async edit({ request, auth }): Promise<'Success' | 'Failure'> {}

	/**
	 * Delete a recipe
	 * Route: DELETE /recipe/delete/:id
	 *
	 * @param token {ApiToken} Login token
	 * @param id {number} The recipe ID
	 *
	 * @return success {“Success” | “Failure”} If the edit was a success
	 *
	 */

	 public async delete({ request, auth }): Promise<"Success"|"Failure">{}
}
