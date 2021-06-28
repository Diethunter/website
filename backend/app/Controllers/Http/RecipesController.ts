import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recipe from 'App/Models/Recipe'
import RecipeValidator from 'App/Validators/RecipeValidator'
import CommentValidator from 'App/Validators/CommentValidator'
import Comment from 'App/Models/Comment'
import axios, { AxiosResponse } from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { SearchAlgorithm } from 'App/Services/Diethunter/Algorithms/Search'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { recipeCherryPick } from 'App/Services/Diethunter/Helpers/cherryPick'
import { fdaRequiredNutrients } from 'App/Services/Diethunter/Helpers/fdaRequiredNutrients'
import EditValidator from 'App/Validators/EditValidator'
import { GetRating } from 'App/Services/Diethunter/Helpers/getRating'

export default class RecipesController {
	/**
	 * Creates a new recipe.
	 * Route: POST /recipes/new
	 *
	 * @body token {ApiToken} API token for user auth
	 * @body title {string} A name for the recipe
	 * @body ingredients {Ingredient[]} Ingredients and amounts for the recipe
	 * @body instructions {string[]} Sequential instructions for cooking the recipe
	 * @body description {string} Recipe description
	 * @body halal {boolean} Whether the recipe is halal
	 * @body kosher {boolean} Whether the recipe is kosher
	 * @body nutfree {boolean} Whether the recipe is nut-free
	 *
	 * @response id {number} A unique ID to identify the recipe
	 */
	public async create({ request, auth, response }: HttpContextContract): Promise<number | void> {
		//Validate the recipe
		let recipe = await request.validate(RecipeValidator)

		//Send Food API request to get recipe nutrition
		let res: AxiosResponse
		let data = {
			title: recipe.title,
			servings: 1,
			ingredients: recipe.ingredients.map(
				(ingredient) =>
					`${ingredient.amount} of ${ingredient.ingredient} ${
						ingredient.notes ? '(' + ingredient.notes + ')' : ''
					}`
			),
			instructions: recipe.instructions.reduce(
				(accumulator, currentValue) => accumulator + ' ' + currentValue
			),
		}
		try {
			res = await axios.post(
				`https://api.spoonacular.com/recipes/analyze?apiKey=${Env.get(
					'SPOONACULAR_API_KEY'
				)}&includeNutrition=true`,
				data
			)
		} catch (e) {
			return response.paymentRequired()
		}

		//Create the recipe
		let created: Recipe = await Recipe.create({
			title: recipe.title,
			rawTitle: recipe.title.toLowerCase(),
			ingredients: JSON.stringify(recipe.ingredients),
			instructions: JSON.stringify(recipe.instructions),
			nutrition: JSON.stringify(
				res.data.nutrition.nutrients.filter((nutrient) =>
					fdaRequiredNutrients.includes(nutrient.name)
				)
			),
			description: recipe.description,
			halal: recipe.halal,
			kosher: recipe.kosher,
			vegan: res.data.vegan,
			vegetarian: res.data.vegetarian,
			nutfree: recipe.nutfree,
			userId: auth.user!.id,
			cuisine: res.data.cuisines[0] || 'American',
		})

		//Return the recipe ID
		return created.id
	}

	/**
	 * Find a recipe by ID.
	 * Route: GET /recipes/:id
	 *
	 * @body id {number} Unique recipe ID
	 *
	 * @response recipe {Recipe | Error } The recipe the ID refers to if it exists
	 */

	public async find({ request, response }: HttpContextContract): Promise<Object | void> {
		//Get recipe id from request
		let recipeId = request.param('id')
		//Attempt to find it
		let recipe = await Recipe.find(recipeId)
		//If found, return it otherwise 404
		if (recipe) {
			await recipe.load('user')
			await recipe.load('comments', (comment) => comment.preload('user'))
			return {
				...recipe.serialize(recipeCherryPick),
				nutrition: recipe.nutrition,
				ingredients: recipe.ingredients,
				instructions: recipe.instructions,
			}
		} else {
			return response.notFound()
		}
	}

	/**
	 * Search for a recipe with constraints
	 * Route:	POST /recipe/search
	 *
	 * @body minCalories {number} Minimum amount of calories
	 * @body maxCalories {number} Maximum amount of calories
	 * @body minProtein {number} Minimum amount of protein in grams
	 * @body maxProtein {number} Maximum amount of protein in grams
	 * @body minCarbs {number} Minimum amount of carbohydrates in grams
	 * @body maxCarbs {number} Maximum amount of carbohydrates in grams
	 * @body minFat {number} Minimum fat
	 * @body maxFat {number} Max fat
	 * @body halal {boolean} If a recipe must be halal-friendly
	 * @body kosher {boolean} If a recipe must be kosher-friendly
	 * @body vegetarian {boolean} If a recipe is vegetarian
	 * @body vegan {boolean} If a recipe is vegan
	 * @body nutFree {boolean} If a recipe does not contain nuts
	 * @body exclude {Ingredient[]} Exclude a certain ingredient i.e. for Allergies
	 * @body include {Ingredient[]} Ingredients that must be in the recipe
	 * @body name {string} Name of recipe
	 *
	 * @response Recipes {Recipe[] | Error} Recipes matching the constraints
	 */

	public async search(ctx: HttpContextContract): Promise<Object[] | void> {
		//Get pagination page
		let page = ctx.request.input('page')
		//Filter recipes
		let serializedRecipes: ModelObject[] | void
		serializedRecipes = await SearchAlgorithm.filter(ctx)

		if (!serializedRecipes) {
			return ctx.response.notFound()
		}

		;(serializedRecipes as ModelObject[]).sort((a, b) => {
			if (a.rating < b.rating) {
				return 1
			}
			if (a.rating > b.rating) {
				return -1
			}
			return 0
		})
		ctx.response.header('x-page-amount', Math.ceil(serializedRecipes.length / 10))
		return (serializedRecipes as ModelObject[])
			.slice((page - 1) * 10, page * 10 - 1)
			.map((recipe) => {
				return {
					...recipe,
					nutrition: recipe.nutrition,
					ingredients: recipe.ingredients,
					instructions: recipe.instructions,
				}
			})
	}

	/**
	 * Search for all recipes
	 * Route:	POST /recipes/explore
	 *
	 * @response Recipes {Recipe[] | Error} Recipes matching the constraints
	 */

	public async explore(ctx: HttpContextContract): Promise<Object[] | void> {
		//Get pagination page
		let page = ctx.request.qs().page
		if (!Number(page)) {
			return ctx.response.unprocessableEntity()
		}

		//Filter recipes
		let serializedRecipes: ModelObject[] = []
		let recipes = await Recipe.query()
			.orderBy('rating', 'desc')
			.where('id', '>', (page - 1) * 10)
			.limit(10)
		for (let recipe of recipes) {
			await recipe.load('user')
			await recipe.load('comments', (comment) => comment.preload('user'))
			serializedRecipes.push(recipe.serialize(recipeCherryPick))
		}

		;(serializedRecipes as ModelObject[]).sort((a, b) => {
			if (a.rating < b.rating) {
				return 1
			}
			if (a.rating > b.rating) {
				return -1
			}
			return 0
		})
		let pageAmount = (await Recipe.query().select('id').orderBy('id', 'desc').first())!.id / 10

		ctx.response.header('x-page-amount', Math.ceil(pageAmount))

		return (serializedRecipes as ModelObject[]).map((recipe) => {
			return {
				...recipe,
				nutrition: recipe.nutrition,
				ingredients: recipe.ingredients,
				instructions: recipe.instructions,
			}
		})
	}

	/**
	 * Comment on a recipe
	 * Route: POST /recipes/comment/:id
	 * @body token {ApiToken} Login token
	 * @body text {string} Your comment on the recipe
	 * @body rating {1|2|3|4|5} Rating of recipe
	 * @response success {“Success” | “Failure”} If the message was a success
	 */

	public async comment({ request, auth, response }: HttpContextContract): Promise<void> {
		//Validate comment
		let comment = await request.validate(CommentValidator)
		//Check if recipe exists
		let recipe = await Recipe.find(request.param('id'))
		if (!recipe) {
			return response.notFound()
		}
		//Check if user has already commented
		let alreadyCommented = await Comment.query()
			.where('user_id', auth.user!.id)
			.where('recipe_id', request.param('id'))
			.first()
		if (alreadyCommented) {
			return response.unprocessableEntity()
		}
		//Create comment
		await recipe.load('comments')
		try {
			await Comment.create({
				...comment,
				recipeId: request.param('id'),
				userId: auth.user!.id,
			})
			recipe.rating = await GetRating.calculate(recipe)
			await recipe.save()
			return response.ok('Success')
		} catch {
			return response.internalServerError()
		}
	}

	/**
	 * Edit a recipe
	 * Route: PUT /recipe/edit/:id
	 *
	 * @body token {ApiToken} Login token
	 * @body id {number} The recipe ID
	 * @body title? {string} A name for the recipe
	 * @body ingredients? {Ingredient[]} Ingredients and amounts for the recipe
	 * @body instructions? {string[]} Sequential instructions for cooking the recipe
	 * @body halal? {boolean} Whether the recipe is halal
	 * @body kosher? {boolean} Whether the recipe is kosher
	 *
	 * @response success {“Success” | “Failure”} If the edit was a success
	 *
	 */

	public async edit({ request, response, auth }: HttpContextContract): Promise<void> {
		//Get all constraints
		let constraints = await request.validate(EditValidator)
		//Find the Recipe
		let recipeToEdit = await Recipe.find(request.param('id'))
		if (!recipeToEdit) {
			return response.notFound()
		}
		//Check if user owns the recipe
		if (recipeToEdit.userId !== auth.user!.id) {
			return response.forbidden()
		}
		//Function to recalculate recipe edits
		//Edit recipe
		typeof constraints.title == 'boolean' && (recipeToEdit!.title = constraints.title)
		typeof constraints.title == 'boolean' && (recipeToEdit!.rawTitle = constraints.title)
		constraints.ingredients && (recipeToEdit!.ingredients = JSON.stringify(constraints.ingredients))
		constraints.instructions &&
			(recipeToEdit!.instructions = JSON.stringify(constraints.instructions))
		typeof constraints.halal == 'boolean' && (recipeToEdit!.halal = constraints.halal)
		typeof constraints.kosher == 'boolean' && (recipeToEdit!.kosher = constraints.kosher)
		typeof constraints.nutfree == 'boolean' && (recipeToEdit!.nutfree = constraints.nutfree)
		constraints.description && (recipeToEdit!.description = constraints.description)
		//Save changes
		recipeToEdit.save()
		return response.ok(recipeToEdit.id)
	}

	/**
	 * Delete a recipe
	 * Route: DELETE /recipe/delete/:id
	 *
	 * @body token {ApiToken} Login token
	 * @body id {number} The recipe ID
	 *
	 * @response success {“Success” | “Failure”} If the edit was a success
	 *
	 */

	public async delete({ request, auth, response }: HttpContextContract): Promise<void> {
		let recipe: number = request.param('id')
		let recipeToDelete = await Recipe.find(recipe)
		if (!recipeToDelete) {
			return response.notFound()
		}
		if (recipeToDelete.userId !== auth.user!.id) {
			return response.forbidden()
		}
		recipeToDelete.delete()
		return response.ok('Success')
	}
}
