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

export default class Recipe extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public userId: number

	@belongsTo(() => User)
	public user: BelongsTo<typeof User>

	@hasMany(() => Comment)
	public comments: HasMany<typeof Comment>

	@column()
	public title: string

	@column()
	public description: string

	@column()
	public cuisine: string

	@column()
	public rawTitle: string

	@column()
	public ingredients: Array<{ amount: string; ingredient: string; notes?: string }> | any

	@column()
	public instructions: Array<string> | any

	@column()
	public nutrition: Array<any> | any

	@column()
	public halal: boolean

	@column()
	public kosher: boolean

	@column()
	public vegan: boolean

	@column()
	public vegetarian: boolean

	@column()
	public nutfree: boolean

	@column()
	public rating?: number

	@computed()
	public get calories() {
		let calorieCount = this.nutrition.find((nutrient) => nutrient.name == 'Calories')
		return calorieCount.amount
	}

	@computed()
	public get minerals() {
		return this.nutrition.map((nutrient) => nutrient.name)
	}

	@computed()
	public get protein() {
		let proteinCount = this.nutrition.find((nutrient) => nutrient.name == 'Protein')
		return proteinCount.amount
	}

	@computed()
	public get fat() {
		let fatCount = this.nutrition.find((nutrient) => nutrient.name == 'Fat')
		return fatCount.amount
	}

	@computed()
	public get carbs() {
		let carbCount = this.nutrition.find((nutrient) => nutrient.name == 'Carbohydrates')
		return carbCount.amount
	}

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
