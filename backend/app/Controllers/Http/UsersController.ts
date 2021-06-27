import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrationValidator from 'App/Validators/RegistrationValidator'
import UserValidator from 'App/Validators/UserValidator'
import ApiToken from 'Contracts/apitoken'
import User from 'App/Models/User'
import OauthValidator from "App/Validators/OauthValidator";

export default class UsersController {
	/**
	 * Registers and auto logs in a new user.
	 * Route: POST /auth/register
	 *
	 * @body username {string} The requested username
	 * @body name {string} The user's name
	 * @body password {string} The password
	 *
	 * @response token {ApiToken} The API token for the user
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
		const token = await auth.attempt(username, password, {
			expiresIn: '7days'
		})

		//Return the token
		return token.toJSON()
	}

	/**
	 * Logs in a user.
	 * Route: POST /auth/login
	 *
	 * @body user {string} The username
	 * @body password {string} The password
	 *
	 * @response token {ApiToken} The API token for the user
	 */
	public async login({ request, auth }: HttpContextContract): Promise<ApiToken & {name: string}> {
		//Validate
		const userInfo = await request.validate(UserValidator)

		const token = await auth.attempt(userInfo.username, userInfo.password, {
			expiresIn: '7days'
		})

		return {...token.toJSON(), name: auth.user!.name}
	}

	/**
	 * Get a user's profile
	 * Route: GET /auth/profile
	 *
	 * @body token {ApiToken} Login token
	 *
	 * @return User {Object} the user
	 *
	 */
	public async profile({ response, auth }: HttpContextContract): Promise<Object | void> {
		let user = await User.query()
			.where('username', auth.user!.username)
			.preload('recipes')
			.first()

		if (!user) {
			return response.notFound()
		}

		return user.toJSON()
	}

	public async oauth({ request, auth }: HttpContextContract): Promise<ApiToken & {username: string, name: string}> {
		let userInfo = await request.validate(OauthValidator)
		try {
			let doesUserExist = await auth.use('api').verifyCredentials(userInfo.username, userInfo.accessToken)
			return {
				...await auth.use('api').generate(doesUserExist),
				username: doesUserExist.username,
				name: doesUserExist.name
			}
		} catch (e) {
			let userSlug = -1
			let getUsername = async (username: string) => {
				let user = await User.findBy("username", username)
				if (!user) {
					return username
				} else {
					userSlug++
					return await getUsername(username + String(userSlug))
				}
			}
			let username = await getUsername(userInfo.username)
			let user = await User.create({
				username: username,
				name: userInfo.name,
				password: userInfo.accessToken
			})
			return {...await auth.use('api').generate(user), username: user.username, name: user.name}
		}
	}
}
