import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Recipe from 'App/Models/Recipe'
import Comment from 'App/Models/Comment'

export default class User extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public username: string

	@column({ serializeAs: null })
	public password?: string

	@column()
	public name: string

	@column()
	public verified: boolean

	@column()
	public accessToken?: string

	@hasMany(() => Recipe)
	public recipes: HasMany<typeof Recipe>

	@hasMany(() => Comment)
	public comments: HasMany<typeof Comment>

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@beforeSave()
	public static async hashPassword(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password!)
		}
	}
}
