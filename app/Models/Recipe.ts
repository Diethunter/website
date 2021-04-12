import { DateTime } from 'luxon'
import {
	BaseModel,
	column,
	BelongsTo,
	belongsTo,
	hasMany,
	HasMany,
	computed,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Comment from 'App/Models/Comment'
import Ingredient from 'contracts/ingredient'
import Nutrient from 'contracts/nutrient'

export default class Recipe extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public user_id: number

	@belongsTo(() => User)
	public user: BelongsTo<typeof User>

	@hasMany(() => Comment)
	public comments: HasMany<typeof Comment>

	@column()
	public title: string

	@column()
	public ingredients: Array<Ingredient>

	@column()
	public instructions: Array<string>

	@column()
	public nutrition: string

	@column()
	public halal: boolean

	@column()
	public kosher: boolean

	@computed()
	public get calories() {
		let calorieCount = this.nutrition.split(",").find((nutrient) => JSON.parse(nutrient).name == 'Calories')
		return JSON.parse(calorieCount!).amount
	}

	@computed()
	public get minerals() {
		return this.nutrition.split(",").map((nutrient) => JSON.parse(nutrient).name)
	}

	@computed()
	public get protein() {
		let calorieCount = this.nutrition.split(",").find((nutrient) => JSON.parse(nutrient).name == 'Protein')
		return JSON.parse(calorieCount!).amount
	}

	@computed()
	public get fat() {
		let calorieCount = this.nutrition.split(",").find((nutrient) => JSON.parse(nutrient).name == 'Fat')
		return JSON.parse(calorieCount!).amount
	}

	@computed()
	public get carbs() {
		let calorieCount = this.nutrition.split(",").find((nutrient) => JSON.parse(nutrient).name == 'Carbohydrates')
		return JSON.parse(calorieCount!).amount
	}

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
