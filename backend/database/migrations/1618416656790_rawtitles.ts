import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Recipes extends BaseSchema {
  protected tableName = 'recipes'

  public async up () {
    this.schema.table(this.tableName, (table) => {
			table.string('raw_title').notNullable()
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
    })
  }
}
