import test from 'japa'
import supertest from 'supertest'
import Recipe from 'App/Models/Recipe'

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
	nutrition: [
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
			name: 'Carbs',
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
	],
	halal: false,
	kosher: true,
}

test.group('Test searching recipes', async function () {
	test('Create a recipe', async function (assert) {
		let { text } = await supertest(BASE_URL).post('/recipes/create').send(TEST_RECIPE)
	})
})
