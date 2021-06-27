import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Check if test runner is working', async function () {
	test('Is assert function working properly', async function (assert) {
		assert.equal<number>(2 + 2, 4)
	})

	test('Is HTTP tests working', async function (assert) {
		const { text } = await supertest(BASE_URL).get('/').expect(200)

		assert.equal<string>(text, 'pong')
	})
})
