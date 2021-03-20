import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrationValidator from "App/Validators/RegistrationValidator"
import ApiToken from "Contracts/apitoken"
import User from "App/Models/User"

export default class UsersController {

  /*
  * Registers and auto logs in a new user.
  * Route: POST /auth/register
  * Params: {
  * username: string,
  * password: string
  * }
  * Returns: {
  * token: ApiToken
  * }
  */
  public async register({ request, auth }: HttpContextContract): Promise<ApiToken> {

    //Validate request to make sure info is valid
    const userInfo = await request.validate(RegistrationValidator)

    //Retrieve username and password values from validated request body.
    const username: string = userInfo.username
    const password: string = userInfo.password

    //Create a new user and store it in Database
    await User.create({
      username,
      password
    });

    //Auto log in the new user
    const token = await auth.attempt(username, password);

    //Return the token
    return token.toJSON()
  }

}
