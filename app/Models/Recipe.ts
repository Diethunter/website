import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Comment from 'App/Models/Comment'
import Ingredient from 'contracts/ingredient'
import Nutrient from 'contracts/nutrient'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @belongsTo(()=>User)
  public user: BelongsTo<typeof User>

  @hasMany(()=>Comment)
  public comments: HasMany<typeof Comment>

  @column()
  public title: string

  @column()
  public ingredients: Array<Ingredient>

  @column()
	public instructions: Array<string>

	@column()
	public nutrition: Array<Nutrient>

  @column()
  public halal: boolean

  @column()
  public kosher: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
