import {ModelObject} from "@ioc:Adonis/Lucid/Model";

export class Filter {
	public static include(validRecipes: Array<any>, include: Array<string>, recipes: ModelObject[]) {
		include = include.map(item => item.toLowerCase())
		for(let recipe of recipes) {
			let includedIngredients: string[] = []
			for(let item of include) {
				for(let ingredient of JSON.parse(recipe.ingredients)) {
					if(ingredient.ingredient.includes(item)) {
						if(!includedIngredients.includes(item)) {
							includedIngredients.push(item)
						}
					}
				}
			}
			if(includedIngredients.length == include.length) {
				validRecipes.push(recipe)
			}
		}
	}

	public static exclude(validRecipes: Array<any>, exclude: Array<string>, recipes: ModelObject[]) {
		exclude = exclude.map(item => item.toLowerCase())
		for(let item of exclude) {
			for(let recipe of recipes) {
				if(!validRecipes.includes(recipe)) {
					validRecipes.push(recipe)
				}
				for(let ingredient of JSON.parse(recipe.ingredients)) {
					if((ingredient.ingredient as string).includes(item)) {
						validRecipes.splice(validRecipes.indexOf(recipe))
						break
					}
				}
			}
		}
	}
}
