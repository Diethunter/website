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
		let calorieCount = JSON.parse(this.nutrition).find((nutrient) => nutrient.name == 'Calories')
		console.log(calorieCount)
		return calorieCount.amount
	}

	@computed()
	public get minerals() {
		return JSON.parse(this.nutrition).map((nutrient) => nutrient.name)
	}

	@computed()
	public get protein() {
		let calorieCount = JSON.parse(this.nutrition).find((nutrient) => nutrient.name == 'Protein')
		return calorieCount.amount
	}

	@computed()
	public get fat() {
		let calorieCount = JSON.parse(this.nutrition).find((nutrient) => nutrient.name == 'Fat')
		return calorieCount.amount
	}

	@computed()
	public get carbs() {
		let calorieCount = JSON.parse(this.nutrition).find((nutrient) => nutrient.name == 'Carbohydrates')
		return calorieCount.amount
	}

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
