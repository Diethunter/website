import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Recipes extends BaseSchema {
  protected tableName = 'recipes'

  public async up () {
    this.schema.table(this.tableName, (table) => {
    	table
				.foreign("user_id")
				.references("users.id")
				.onDelete("CASCADE")
    })
  }

  public async down () {

  }
}
