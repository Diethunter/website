import { CherryPick } from '@ioc:Adonis/Lucid/Orm'

export let recipeCherryPick: CherryPick = {
	fields: {
		omit: ['user_id', 'created_at', 'updated_at', 'raw_title'],
	},
	relations: {
		user: {
			fields: {
				omit: ['id', 'created_at', 'updated_at'],
			},
		},
		comments: {
			fields: {
				omit: ['id', 'user_id', 'recipe_id', 'updated_at'],
			},
			relations: {
				user: {
					fields: {
						omit: ['id', 'created_at', 'updated_at'],
					},
				},
			},
		},
	},
}
