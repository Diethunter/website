import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recipe from 'App/Models/Recipe'
import RecipeValidator from 'App/Validators/RecipeValidator'
import CommentValidator from 'App/Validators/CommentValidator'
import Comment from 'App/Models/Comment'

export default class RecipesController {
	/**
	 * Creates a new recipe.
	 * Route: POST /recipe/new
	 *
	 * @param token {ApiToken} API token for user auth
	 * @param title {string} A name for the recipe
	 * @param ingredients {Ingredient[]} Ingredients and amounts for the recipe
	 * @param instructions {string[]} Sequential instructions for cooking the recipe
	 * @param nutrition {Nutrient[]} Nutrients in food
	 * @param halal {boolean} Whether the recipe is halal
	 * @param kosher {boolean} Whether the recipe is kosher
	 *
	 * @return id {number} A unique ID to identify the recipe
	 */
	public async create({ request, auth }: HttpContextContract): Promise<number> {
		//Validate the recipe
		let recipe = await request.validate(RecipeValidator)

		//Create the recipe
		let created: Recipe = await Recipe.create({
			...recipe,
			user_id: auth.user!.id,
		})

		//Return the recipe ID
		return created.id
	}

	/**
	 * Find a recipe by ID.
	 * Route: GET /recipes/:id
	 *
	 * @param id {number} Unique recipe ID
	 *
	 * @return recipe {Recipe | Error } The recipe the ID refers to if it exists
	 */

	public async find({ request, response }: HttpContextContract): Promise<Object | void> {
		//Get recipe id from request
		let recipeId = request.param('id')
		//Attempt to find it
		let recipe = await Recipe.find(recipeId)
		//If found, return it otherwise 404
		if (recipe) {
			return recipe.toJSON()
		} else {
			return response.notFound()
		}
	}

	/**
	 * Search for a recipe with constraints
	 * Route:	POST /recipe/search
	 *
	 * @param minCalories {number} Minimum amount of calories
	 * @param maxCalories {number} Maximum amount of calories
	 * @param minProtein {number} Minimum amount of protein in grams
	 * @param maxProtein {number} Maximum amount of protein in grams
	 * @param minCarbs {number} Minimum amount of carbohydrates in grams
	 * @param maxCarbs {number} Maximum amount of carbohydrates in grams
	 * @param minFat {number} Minimum fat
	 * @param maxFat {number} Max fat
	 * @param halal {boolean} If a recipe must be halal-friendly
	 * @param kosher {boolean} If a recipe must be kosher-friendly
	 * @param exclude {Ingredient[]} Exclude a certain ingredient i.e. for Allergies
	 * @param include {Ingredient[]} Ingredients that must be in the recipe
	 *
	 * @return Recipes {Recipe[] | Error} Recipes matching the constraints
	 */

	public async search({ request, response }: HttpContextContract): Promise<Object[] | void> {
		//Get recipe constraints
		let constraints = request.all()
		//Get recipes with the halal and kosher
		let recipeQuery = Recipe.query()
		if (constraints.halal) {
			recipeQuery = recipeQuery.where('halal', true)
		}
		if (constraints.kosher) {
			recipeQuery = recipeQuery.where('kosher', true)
		}
		let recipes: Recipe[] = await recipeQuery

		let serializedRecipes = recipes.map((recipe) => recipe.toJSON())

		//Filter calories
		constraints.minCalories
			? serializedRecipes.filter((recipe) => recipe.calories > constraints.minCalories)
			: null
		constraints.maxCalories
			? serializedRecipes.filter((recipe) => recipe.calories < constraints.maxCalories)
			: null
		//Return if no results
		if (serializedRecipes.length < 1) {
			return response.notFound()
		}
		//Filter protein
		constraints.minProtein
			? serializedRecipes.filter((recipe) => recipe.protein > constraints.minProtein)
			: null
		constraints.maxProtein
			? serializedRecipes.filter((recipe) => recipe.protein < constraints.maxProtein)
			: null
		//Return if no results
		if (serializedRecipes.length < 1) {
			return response.notFound()
		}
		//Filter carbs
		constraints.minCarbs
			? serializedRecipes.filter((recipe) => recipe.carbs > constraints.minCarbs)
			: null
		constraints.maxCarbs
			? serializedRecipes.filter((recipe) => recipe.carbs < constraints.maxCarbs)
			: null
		//Return if no results
		if (serializedRecipes.length < 1) {
			return response.notFound()
		}
		//Filter Fat
		constraints.minCarbs
			? serializedRecipes.filter((recipe) => recipe.carbs > constraints.minCarbs)
			: null
		constraints.maxCarbs
			? serializedRecipes.filter((recipe) => recipe.carbs < constraints.maxCarbs)
			: null
		//Return if no results
		if (serializedRecipes.length < 1) {
			return response.notFound()
		}
		//Filter ingredients
		constraints.include
			? serializedRecipes.filter((recipe) =>
					constraints.include.map((ingredient) => ingredient in recipe.ingredients)
			  )
			: null
		constraints.exclude
			? serializedRecipes.filter((recipe) =>
					constraints.exclude.map((ingredient) => !(ingredient in recipe.ingredients))
			  )
			: null
		//Return if no results
		if (serializedRecipes.length < 1) {
			return response.notFound()
		}
		return serializedRecipes
	}

	/**
	 * Comment on a recipe
	 * Route: POST /recipe/comment/:id
	 * @param token {ApiToken} Login token
	 * @param text {string} Your comment on the recipe
	 * @param rating {1|2|3|4|5} Rating of recipe
	 * @return success {“Success” | “Failure”} If the message was a success
	 */

	public async comment({ request, auth }: HttpContextContract): Promise<'Success' | 'Failure'> {
		//Validate comment
		let comment = await request.validate(CommentValidator)
		//Create comment
		try {
			await Comment.create({
				...comment,
				recipe_id: request.param('id'),
				user_id: auth.user!.id,
			})
			return 'Success'
		} catch {
			return 'Failure'
		}
	}

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

	public async edit({ request, response, auth }: HttpContextContract): Promise<'Success' | void> {
		//Get all constraints
		let contraints = request.all()
		//Find the Recipe
		let recipeToEdit = await Recipe.find(request.param('id'))
		if (!recipeToEdit) {
			return response.notFound()
		}
		//Check if user owns the recipe
		if (recipeToEdit.user_id !== auth.user!.id) {
			return response.unauthorized()
		}
		//Edit recipe
		contraints.title ? (recipeToEdit!.title = contraints.title) : null
		contraints.ingredients ? (recipeToEdit!.ingredients = contraints.ingredient) : null
		contraints.instructions ? (recipeToEdit!.instructions = contraints.instructions) : null
		contraints.halal ? (recipeToEdit!.halal = contraints.halal) : null
		contraints.kosher ? (recipeToEdit!.kosher = contraints.kosher) : null
		//Save changes
		recipeToEdit.save()
		return 'Success'
	}

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

	public async delete({ request, auth, response }: HttpContextContract): Promise<'Success' | void> {
		let recipe: number = request.param('id')
		let recipeToDelete = await Recipe.find(recipe)
		if (!recipeToDelete) {
			return response.notFound()
		}
		if (recipeToDelete.user_id !== auth.user!.id) {
			return response.unauthorized()
		}
		recipeToDelete.delete()
		return 'Success'
	}
}
