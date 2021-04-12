import supertest from 'supertest'
import ApiToken from 'contracts/apitoken'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

export async function register(username: string): Promise<ApiToken> {
	let text = JSON.parse((await supertest(BASE_URL).post('/auth/register').send({
		username,
		password: 'supersecretpassword',
		name: 'Myname Jeff',
	})).text)
	return text.token
}
