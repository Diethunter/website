import Recipe from 'App/Models/Recipe'

export class GetRating {
	public static async calculate(recipe: Recipe): Promise<number> {
		await recipe.preload("comments", comment => comment.preload('user'))
		let ratingPool = 0
		if(!recipe.comments.length) {
			return 0
		} else {
			for(let comment of recipe.comments) {
				ratingPool += comment.rating
			}
			return ratingPool / recipe.comments.length
		}
	}
}


