import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Recipe from 'App/Models/Recipe'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public recipe_id: number

  @column()
  public text: string

  @column()
  public rating: 1|2|3|4|5

  @belongsTo(()=>User)
  public user: BelongsTo<typeof User>

  @belongsTo(()=>Recipe)
  public recipe: BelongsTo<typeof Recipe>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
