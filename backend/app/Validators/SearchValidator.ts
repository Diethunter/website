import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SearchValidator {
	constructor(protected ctx: HttpContextContract) {}

	/*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
	public schema = schema.create({
		name: schema.string.optional(),
		minCalories: schema.string.optional(),
		maxCalories: schema.string.optional(),
		minFat: schema.string.optional(),
		maxFat: schema.string.optional(),
		minCarbs: schema.string.optional(),
		maxCarbs: schema.string.optional(),
		minProtein: schema.string.optional(),
		maxProtein: schema.string.optional(),
		halal: schema.boolean.optional(),
		kosher: schema.boolean.optional(),
		vegan: schema.boolean.optional(),
		vegetarian: schema.boolean.optional(),
		nutfree: schema.boolean.optional(),
		include: schema.array.optional().members(schema.string()),
		exclude: schema.array.optional().members(schema.string()),
		cuisine: schema.enum.optional([
			'African',
			'American',
			'British',
			'Cajun',
			'Caribbean',
			'Chinese',
			'Eastern European',
			'European',
			'French',
			'German',
			'Greek',
			'Indian',
			'Irish',
			'Italian',
			'Japanese',
			'Jewish',
			'Korean',
			'Latin American',
			'Mediterranean',
			'Mexican',
			'Middle Eastern',
			'Nordic',
			'Southern',
			'Spanish',
			'Thai',
			'Vietnamese',
		] as const),
	})

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
	public messages = {}
}
