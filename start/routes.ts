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

//Test and healthcheck route
Route.get('/ping', async () => {
	return 'pong'
})

//API routes for user auth
Route.group(() => {
	Route.post('/register', 'UsersController.register')

	Route.post('/login', 'UsersController.login')
}).prefix('/auth')

Route.group(() => {
	Route.post("/search", "RecipesController.search")
	Route.post("/new", "RecipesController.create").middleware('auth')
	Route.post("/comment/:id", "RecipesController.comment").middleware('auth')
	Route.put("/edit/:id", "RecipesController.edit").middleware('auth')
	Route.delete("/delete/:id", "RecipesController.delete").middleware('auth')
	Route.get("/:id", "RecipesController.find")
}).prefix('/recipes')
