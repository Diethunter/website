import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrationValidator from 'App/Validators/RegistrationValidator'
import UserValidator from 'App/Validators/UserValidator'
import ApiToken from 'Contracts/apitoken'
import User from 'App/Models/User'

export default class UsersController {
	/**
	 * Registers and auto logs in a new user.
	 * Route: POST /auth/register
	 *
	 * @param user {string} The requested username
	 * @param password {string} The password
	 *
	 * @return token {ApiToken} The API token for the user
	 */
	public async register({ request, auth }: HttpContextContract): Promise<ApiToken> {
		//Validate request to make sure info is valid
		const userInfo = await request.validate(RegistrationValidator)

		//Retrieve username and password values from validated request body.
		const username: string = userInfo.username
		const password: string = userInfo.password
		const name: string = userInfo.name

		//Create a new user and store it in Database, and fill in name
		await User.create({
			username,
			password,
			name,
			verified: false,
		})

		//Auto log in the new user
		const token = await auth.attempt(username, password)

		//Return the token
		return token.toJSON()
	}

	/**
	 * Logs in a user.
	 * Route: POST /auth/login
	 *
	 * @param user {string} The username
	 * @param password {string} The password
	 *
	 * @return token {ApiToken} The API token for the user
	 */
	public async login({ request, auth }: HttpContextContract): Promise<ApiToken> {
		//Validate
		const userInfo = await request.validate(UserValidator)

		const token = await auth.attempt(userInfo.username, userInfo.password)

		return token.toJSON()
	}

		/**
	 * Get a user's profile
	 * Route: GET /user/:username
	 *
	 * @param token {ApiToken} Login token
	 * @param username {string} The username
	 *
	 * @return User {Object} the user
	 *
	 */
	public async profile({ request, response }: HttpContextContract): Promise<Object | void> {
		//Get username
		let username = request.param('username')

		let user = await User
		.query()
		.where("username", username)
		.preload("recipes")
		.preload("comments")
		.first()

		if (!user) {
			return response.notFound()
		}

		return user.toJSON()
	}
}
