import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Header {
	public async handle({ response }: HttpContextContract, next: () => Promise<void>) {
		// code for middleware goes here. ABOVE THE NEXT CALL
		response.header('Access-Control-Expose-Headers', 'x-page-amount')
		await next()
	}
}
