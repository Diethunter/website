# Diethunter: Don't be limited™.
## Our Purpose
Over 200 million people around the world have some dietary restriction.
They have limited options and have to be careful, because 
accidentally ingesting the wrong thing can cause them to break out
in hives.

It doesn't have to be that way.

We created Diethunter so everyone, no matter what allergies they have,
no matter what dietary restrictions they have, can enjoy
food just like anyone else.

But allergies aren't the only thing that limits people. Diets like vegan
and keto can be a challenge to follow when you have to invest time into
finding the correct recipe. But with Diethunter, you can easily
search for recipes that meet your needs.

Eating healthy doesn't have to be hard.

Don't be limited™.

## Technical details
For those who are inspecting the source code, here are
a couple of details that will assist you:

### Our Tech Stack
Diethunter is a decouples application, meaning that the frontend
and backend are hosted seperately. Diethunter uses the decoupled MANA stack,
which stands for:  

MySQL  
AdonisJS  
NodeJS  
Angular  

The purpose of the MANA stack is to provide a flexible development experience which prioritizes developer experience.  
MySQL is a tried and tested database which is not bloated with unnecessary features that do not benefit the developer.  

AdonisJS is a developer-first framework written in Typescript. It allows us to quickly ship code instead of wasting time building infrastructure like many developers do with a lower-scope framework like Express.  

NodeJS is a Javascript runtime primarily used for web development. It is a boon to the fullstack developer because one language, Typescript, can be used frontend and backend.  

Angular is a Java-style frontend framework created by Google. We chose Angular because although it is quite complex, its modularity means for extreme scalability.

### Our Nutrition Data
Our recipe-analyzing software is sourced from the Spoonacular food api.
### Running locally
1. Install MySQL, its Docker image, or provision a MySQL server in the cloud.  
2. Install Redis, its Docket image, or provision a Redis server in the cloud.
3. `cd` into `backend` and `frontend` and run `yarn` in each.  
4. Get a Food API key from Spoonacular and add it to `backend/.env`.
5. Get a Google Developer OAuth API key and add it to the Angular environment variables.
6. Fill in the backend environment variables as necessary.
7. `cd` into `backend` and run `node ace serve --watch`
8. `cd` into `frontend` and run `ng serve`

