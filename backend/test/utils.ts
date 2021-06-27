import supertest from 'supertest'
import ApiToken from 'contracts/apitoken'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

export async function register(username: string): Promise<ApiToken> {
	let text = JSON.parse(
		(
			await supertest(BASE_URL).post('/auth/register').send({
				username,
				password: 'supersecretpassword',
				name: 'Myname Jeff',
			})
		).text
	)
	return text.token
}

export const TEST_RECIPE = {
	"title": "Chicken Tacos",
	"description": "Tasty recipe yum",
	"ingredients": [
		{
			"amount": "2 teaspoons",
			"name": "chili powder"
		},
		{
			"amount": "1 teaspoon",
			"name": "ground cumin"
		},
		{
			"amount": "1 teaspoon",
			"name": "smoked paprika"
		},
		{
			"amount": "1 teaspoon",
			"name": "dried oregano"
		},
		{
			"amount": "0.5 teaspoon",
			"name": "garlic powder"
		},
		{
			"amount": "1 tablespoon",
			"name": "canola oil"
		},
		{
			"amount": "12",
			"name": "mini flour tortillas",
			"notes": "warmed"
		},
		{
			"amount": "1 cup",
			"name": "pico de gallo",
			"notes": "Homemade or store-bought"
		},
		{
			"amount": "1 piece",
			"name": "avocado",
			"notes": "halved, peeled, seeded, and diced"
		},
		{
			"amount": "0.5 cup",
			"name": "chopped fresh cilantro leaves"
		},
		{
			"amount": "1 piece",
			"name": "lime",
			"notes": "cut into wedges"
		}
	],
	"instructions": [
		"Mix together chili powder, cumin, paprika, oregano, garlic powder, 1 teaspoon of salt and 1/2 teaspoon of pepper.",
		"After doing so, proceed to season the chicken with the mixture. In a large skillet over medium-high heat, heat canola oil.",
		"Add the chicken to the skillet and cook until a golden brown color is achieved. Internal temperature should be 165 degrees Fahrenheit, with about 4-5 minutes for each side.",
		"Then, take it out and let it cool. Once it’s cooled, dice the chicken into bite-sized pieces.",
		"Wrap the chicken pieces in tortillas, and top the tacos with pico de gallo, avocado, cilantro and lime."
	],
	"halal": true,
	"kosher": true,
	"nutfree": false
}

export let token = register("testuser")

export let created = {
	id: ""
}
