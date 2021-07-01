import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.table(this.tableName, (table) => {
			table
				.foreign("recipe_id")
				.references("recipes.id")
				.onDelete("CASCADE")
    })
  }

  public async down () {

  }
}
