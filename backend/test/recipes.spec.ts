import test from 'japa'
import supertest from 'supertest'
import Recipe from 'App/Models/Recipe'
import { created, register, TEST_RECIPE, token } from './utils'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Test recipes', async function () {
	test('Create a recipe', async function (assert) {
		let token = await register('recipe_createrecipe')
		let { text } = await supertest(BASE_URL)
			.post('/recipes/new')
			.set('Authorization', 'Bearer ' + token)
			.send(TEST_RECIPE)
			.expect(200)
		created.id = text
		let recipe = await Recipe.find(text)
		assert.exists(recipe)
	})
	test('Validate a recipe', async function () {
		let token = await register('recipe_validaterecipe')
		await supertest(BASE_URL)
			.post('/recipes/new')
			.set('Authorization', 'Bearer ' + token)
			.send({})
			.expect(422)
	})
	test('Find a recipe', async function () {
		await supertest(BASE_URL)
			.get('/recipes/' + created.id)
			.expect(200)
	})
	test('Search recipes', async function (assert) {
		let findRecipe = (await supertest(BASE_URL).post('/recipes/search').send({ name: 'chicken' }))
			.text
		assert.isNotEmpty(findRecipe)
	})
	test.failing('Search recipes by name', async function (assert) {
		let findRecipe = (
			await supertest(BASE_URL).post('/recipes/search').send({
				minCalories: '99',
				minProtein: '99',
				minCarbs: '99',
				minFat: '99',
				name: 'kuashdkah',
			})
		).text
		assert.isNotEmpty(findRecipe)
	})
	test('Edit recipe', async function (assert) {
		await supertest(BASE_URL)
			.put('/recipes/edit/' + created.id)
			.set('Authorization', 'Bearer ' + token)
			.send({
				title: 'ThisRecipeIsChanged',
			})
			.expect(200)
		let recipe = await Recipe.find(created.id)
		assert.equal(recipe!.title, 'ThisRecipeIsChanged')
	})
	test('Delete recipe', async function (assert) {
		let { text } = await supertest(BASE_URL)
			.post('/recipes/new')
			.set('Authorization', 'Bearer ' + token)
			.send(TEST_RECIPE)
			.expect(200)
		await supertest(BASE_URL)
			.delete('/recipes/delete/' + text)
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
		let recipe = await Recipe.find(text)
		assert.notExists(recipe)
	})
	test('Comment on recipe', async function (assert) {
		await supertest(BASE_URL)
			.post('/recipes/comment/' + created.id)
			.set('Authorization', 'Bearer ' + token)
			.send({
				text: 'Very nice recipe',
				rating: 5,
			})
			.expect(200)
		let comment = (
			await supertest(BASE_URL)
				.get('/recipes/' + created.id)
				.expect(200)
		).text
		assert.exists(JSON.parse(comment).comments)
		assert.exists(JSON.parse(comment).user)
	})
})
