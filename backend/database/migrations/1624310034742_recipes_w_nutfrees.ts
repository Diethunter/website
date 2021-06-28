import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Recipes extends BaseSchema {
	protected tableName = 'recipes'

	public async up() {
		this.schema.table(this.tableName, (table) => {
			table.boolean('nutfree')
			table.boolean('vegan')
			table.boolean('vegetarian')
		})
	}

	public async down() {}
}
