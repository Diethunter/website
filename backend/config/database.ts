/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
//import { OrmConfig } from '@ioc:Adonis/Lucid/Orm'
import Application from '@ioc:Adonis/Core/Application'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
	/*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
	connection: Env.get('DB_CONNECTION'),

	connections: {
		/*
    |--------------------------------------------------------------------------
    | SQLite
    |--------------------------------------------------------------------------
    |
    | Configuration for the SQLite database.  Make sure to install the driver
    | from npm when using this connection
    |
    | npm i sqlite3
    |
    */
		sqlite: {
			client: 'sqlite',
			connection: {
				filename: Application.tmpPath('db.sqlite3'),
			},
			useNullAsDefault: true,
			healthCheck: Env.get('DB_CONNECTION') == 'sqlite',
			debug: Env.get('DEBUG_QUERIES'),
		},

		/*
    |--------------------------------------------------------------------------
    | MySQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for MySQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mysql
    |
    */
		mysql: {
			client: 'mysql2',
			connection: {
				host: Env.get('MYSQLHOST'),
				port: Env.get('MYSQLPORT'),
				user: Env.get('MYSQLUSER'),
				password: Env.get('MYSQLPASSWORD', ''),
				database: Env.get('MYSQLDATABASE'),
			},
			healthCheck: Env.get('DB_CONNECTION') == 'mysql',
			debug: Env.get('DEBUG_QUERIES'),
			migrations: {
				disableRollbacksInProduction: true
			}
		},
	},

	/*
  |--------------------------------------------------------------------------
  | ORM Configuration
  |--------------------------------------------------------------------------
  |
  | Following are some of the configuration options to tweak the conventional
  | settings of the ORM. For example:
  |
  | - Define a custom function to compute the default table name for a given model.
  | - Or define a custom function to compute the primary key for a given model.
  |
  */
}

export default databaseConfig
