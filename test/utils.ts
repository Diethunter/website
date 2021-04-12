import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

export async function register(username) {
	let text = JSON.parse((await supertest(BASE_URL).post('/auth/register').send({
		username,
		password: 'supersecretpassword',
		name: 'Myname Jeff',
	})).text)
	return text.token
}
