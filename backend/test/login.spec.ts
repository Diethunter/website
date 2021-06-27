import test from 'japa'
import supertest from 'supertest'
import { register } from './utils'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Test user login', async function () {
	test('Test raw login', async function (assert) {
		await register('login_AvidCoder123')

		//Now try to login the user
		let { text }: any = await supertest(BASE_URL)
			.post('/auth/login')
			.send({
				username: 'login_AvidCoder123',
				password: 'supersecretpassword',
				name: 'MyName Jeff',
			})
			.expect(200)

		text = JSON.parse(text)

		assert.exists(text.token)
	})

	test('Incorrect login should not work', async function () {
		//Register a user first
		await register('login_testuser1')

		//Now try to login the user
		await supertest(BASE_URL)
			.post('/auth/login')
			.send({ username: 'login_testuser1', password: 'IncorrectPassword' })
			.expect(400)
	})

	test('Logging in a nonexistant user should not work', async function () {
		//Register a user first
		await register('login_testuser2')

		//Now try to login the user
		await supertest(BASE_URL)
			.post('/auth/login')
			.send({ username: 'login_doesnotexist1', password: 'SuperSecretPassword' })
			.expect(400)
	})
})
