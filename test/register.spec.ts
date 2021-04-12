import test from 'japa'
import supertest from 'supertest'
import User from 'App/Models/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Test user registration', async function () {
	test('Test raw registration', async function (assert) {
		let { text }: any = await supertest(BASE_URL)
			.post('/auth/register')
			.send({
				username: 'register_AvidCoder123',
				password: 'supersecretpassword',
				name: 'Myname Jeff',
			})
			.expect(200)

		text = JSON.parse(text)

		assert.exists(text.token)

		let registered = await User.findBy('username', 'register_AvidCoder123')

		assert.exists(registered)
	})

	test('Test validating required fields', async function (assert) {
		await supertest(BASE_URL)
			.post('/auth/register')
			.send({ username: 'register_SomeRandomUser' })
			.expect(422)

		let incorrectUser = await User.findBy('username', 'register_SomeRandomUser')

		assert.notExists(incorrectUser)
	})

	test('Prevent duplicate users', async function (assert) {
		await supertest(BASE_URL)
			.post('/auth/register')
			.send({
				username: 'register_DuplicateUser',
				password: 'supersecretpassword',
				name: 'MyName Jeff',
			})
			.expect(200)

		await supertest(BASE_URL)
			.post('/auth/register')
			.send({
				username: 'register_DuplicateUser',
				password: 'supersecretpassword',
				name: 'MyName Jeff',
			})
			.expect(422)

		let dupes = await User.findBy('username', 'register_DuplicateUser')

		assert.exists(dupes)
	})
})
