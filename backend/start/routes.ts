/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from "@ioc:Adonis/Core/HealthCheck";

Route.get("/", async () => "Pong")

//Test and healthcheck route
Route.get('/health', async ({ response }) => {
	let report = await HealthCheck.getReport()
	return report.healthy
		? response.ok(report)
		: response.badRequest(report)
})

//API routes for user auth
Route.group(() => {
	Route.post('/register', 'UsersController.register')

	Route.post('/login', 'UsersController.login')

	Route.get('/profile', 'UsersController.profile').middleware('auth')

	Route.post('/oauth', 'UsersController.oauth')
}).prefix('/auth')

Route.group(() => {
	Route.post('/search', 'RecipesController.search')
	Route.post('/new', 'RecipesController.create').middleware('auth')
	Route.post('/comment/:id', 'RecipesController.comment').middleware('auth').where('id',/^[0-9]+$/)
	Route.put('/edit/:id', 'RecipesController.edit').middleware('auth').where('id',/^[0-9]+$/)
	Route.delete('/delete/:id', 'RecipesController.delete').middleware('auth').where('id',/^[0-9]+$/)
	Route.get('/explore', 'RecipesController.explore')
	Route.get('/:id', 'RecipesController.find').where('id',/^[0-9]+$/)
}).prefix('/recipes')
