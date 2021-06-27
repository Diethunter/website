import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Recipe from "App/Models/Recipe";
import SearchValidator from "App/Validators/SearchValidator";
import {ModelObject} from "@ioc:Adonis/Lucid/Model";
import {recipeCherryPick} from "App/Services/Diethunter/Helpers/cherryPick";
import {Filter} from "App/Services/Diethunter/Algorithms/Filter";

export class SearchAlgorithm {
	public static async filter(ctx: HttpContextContract): Promise<ModelObject[] | void> {
		let constraints = await ctx.request.validate(SearchValidator)
		let recipeQuery = Recipe.query()
		if (constraints.halal) {
			recipeQuery = recipeQuery.where('halal', true)
		}
		if (constraints.kosher) {
			recipeQuery = recipeQuery.where('kosher', true)
		}
		if (constraints.vegan) {
			recipeQuery = recipeQuery.where('vegan', true)
		}
		if (constraints.vegetarian) {
			recipeQuery = recipeQuery.where('vegetarian', true)
		}
		if (constraints.nutfree) {
			recipeQuery = recipeQuery.where('nutfree', true)
		}

		if (constraints.name) {
			recipeQuery.where('raw_title', 'like', `%${constraints.name.toLowerCase()}%`)
		}
		if (constraints.cuisine) {
			recipeQuery.where('cuisine', constraints.cuisine)
		}
		recipeQuery.orderBy('rating', 'desc')

		await recipeQuery.preload('comments', comment => comment.preload('user'))
		await recipeQuery.preload('user')

		let recipes: Recipe[] = await recipeQuery

		let serializedRecipes: ModelObject[] = []

		for(let recipe of recipes) {
			serializedRecipes.push(recipe.serialize(recipeCherryPick))
		}
			//Filter calories
			constraints.minCalories
				? serializedRecipes.filter((recipe) => recipe.calories > constraints.minCalories!)
				: null
			constraints.maxCalories
				? serializedRecipes.filter((recipe) => recipe.calories < constraints.maxCalories!)
				: null
			//Return if no results
			if (serializedRecipes.length < 1) {
				return ctx.response.notFound()
			}
			//Filter protein
			constraints.minProtein
				? serializedRecipes.filter((recipe) => recipe.protein > constraints.minProtein!)
				: null
			constraints.maxProtein
				? serializedRecipes.filter((recipe) => recipe.protein < constraints.maxProtein!)
				: null
			//Return if no results
			if (serializedRecipes.length < 1) {
				return ctx.response.notFound()
			}
			//Filter carbs
			constraints.minCarbs
				? serializedRecipes.filter((recipe) => recipe.carbs > constraints.minCarbs!)
				: null
			constraints.maxCarbs
				? serializedRecipes.filter((recipe) => recipe.carbs < constraints.maxCarbs!)
				: null
			//Return if no results
			if (serializedRecipes.length < 1) {
				return ctx.response.notFound()
			}
			//Filter Fat
			constraints.minCarbs
				? serializedRecipes.filter((recipe) => recipe.carbs > constraints.minCarbs!)
				: null
			constraints.maxCarbs
				? serializedRecipes.filter((recipe) => recipe.carbs < constraints.maxCarbs!)
				: null
			//Return if no results
			if (serializedRecipes.length < 1) {
				return ctx.response.notFound()
			}

			let validRecipes = []
			//Filter ingredients
			constraints.include
				? Filter.include(validRecipes, constraints.include, serializedRecipes)
				: null
			constraints.exclude
				? Filter.exclude(validRecipes, constraints.exclude, serializedRecipes)
				: null
			//Return if no results
			if (serializedRecipes.length < 1) {
				return ctx.response.notFound()
			}


			return (constraints.include || constraints.exclude) ?
				(validRecipes.length
					? validRecipes
					: ctx.response.notFound())
				: serializedRecipes
		}
}
