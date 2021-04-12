import test from 'japa'
import supertest from 'supertest'
import Recipe from 'App/Models/Recipe'
import { register } from "./utils"

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const TEST_RECIPE = {
	title: 'Some Recipe',
	ingredients: [
		{
			amount: '1/4 cups',
			name: 'Tears of credit card scammers',
			notes: 'Must be fresh and boiled.',
		},
	],
	instructions: ['Boil the tears', 'Fry the boiled salt'],
	nutrition: JSON.stringify([
		{
			name: 'Calories',
			amount: '100',
			unit: 'kcal',
			percentOfDailyNeeds: 0.05,
		},
		{
			name: 'Fat',
			amount: '100',
			unit: 'g',
			percentOfDailyNeeds: 0.05,
		},
		{
			name: 'Protein',
			amount: '100',
			unit: 'g',
			percentOfDailyNeeds: 0.05
		},
		{
			name: 'Carbohydrates',
			amount: '100',
			unit: 'g',
			percentOfDailyNeeds: 0.05,
		},
		{
			name: 'Copper',
			amount: '100',
			unit: 'mg',
			percentOfDailyNeeds: 0.05,
		},
	]),
	halal: false,
	kosher: true,
}

test.group('Test recipes', async function () {
	test('Create a recipe', async function (assert) {
		let token = await register('recipe_createrecipe')
		let { text } = await supertest(BASE_URL)
		.post('/recipes/new')
		.set("Authorization", "Bearer "+ token)
		.send(TEST_RECIPE)
		.expect(200)
		let recipe = await Recipe.find(text)
		assert.exists(recipe)
	})
	test('Validate a recipe', async function (assert) {
		let token = await register('recipe_validaterecipe')
		await supertest(BASE_URL)
		.post('/recipes/new')
		.set("Authorization", "Bearer "+ token)
		.send({})
		.expect(422)
	})
	test('Find a recipe', async function (assert) {
		let token = await register('recipe_findrecipe')
		let { text } = await supertest(BASE_URL)
		.post('/recipes/new')
		.set("Authorization", "Bearer "+ token)
		.send(TEST_RECIPE)
		.expect(200)
		await supertest(BASE_URL)
		.get("/recipes/"+text)
		.expect(200)
	})
	test("Search recipes", async function(assert) {
		let token = await register('recipe_searchrecipe')
		let { text } = await supertest(BASE_URL)
		.post('/recipes/new')
		.set("Authorization", "Bearer "+ token)
		.send(TEST_RECIPE)
		.expect(200)
		let findRecipe = (
			await supertest(BASE_URL)
			.post("/search")
			.send({
				minCalories: "99",
				minProtein: "99",
				minCarbs: "99",
				minFat: "99"
			})
		).text
		assert.exists(findRecipe)
	})
	test("Edit recipe", async function(assert) {
		let token = await register('recipe_createrecipe')
		let { text } = await supertest(BASE_URL)
		.post('/recipes/new')
		.set("Authorization", "Bearer "+ token)
		.send(TEST_RECIPE)
		.expect(200)
		await supertest(BASE_URL)
		.put('/recipes/edit/'+text)
		.set("Authorization", "Bearer "+ token)
		.send({
			title: "ThisRecipeIsChanged"
		})
		.expect(200)
		let recipe = await Recipe.find(text)
		assert.equal(recipe!.title, "ThisRecipeIsChanged")
	})
})
