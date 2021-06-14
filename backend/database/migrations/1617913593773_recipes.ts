import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Recipes extends BaseSchema {
	protected tableName = 'recipes'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('user_id').notNullable().unsigned()
			table.string('title').notNullable()
			table.json('ingredients').notNullable()
			table.json('instructions').notNullable()
			table.boolean('halal').notNullable()
			table.boolean('kosher').notNullable()
			table.timestamps(true)
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
