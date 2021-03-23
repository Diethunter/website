import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group("Test user login", async function() {
  test("Test raw login", async function(assert) {

    //Register a user first
    await supertest(BASE_URL)
    .post("/auth/register")
    .send({username: "login_AvidCoder123", password: "SuperSecretPassword"})
    .expect(200)

    //Now try to login the user
    let { text }: any = await supertest(BASE_URL)
    .post("/auth/login")
    .send({username: "login_AvidCoder123", password: "SuperSecretPassword"})
    .expect(200)

    text = JSON.parse(text)

    assert.exists(text.token)
  })

  test("Incorrect login should not work", async function(assert) {

    //Register a user first
    await supertest(BASE_URL)
    .post("/auth/register")
    .send({username: "login_testuser1", password: "SuperSecretPassword"})
    .expect(200)

    //Now try to login the user
    await supertest(BASE_URL)
    .post("/auth/login")
    .send({username: "login_testuser1", password: "IncorrectPassword"})
    .expect(400)
  })

  test("Logging in a nonexistant user should not work", async function(assert) {

    //Register a user first
    await supertest(BASE_URL)
    .post("/auth/register")
    .send({username: "login_testuser2", password: "SuperSecretPassword"})
    .expect(200)

    //Now try to login the user
    await supertest(BASE_URL)
    .post("/auth/login")
    .send({username: "login_doesnotexist1", password: "SuperSecretPassword"})
    .expect(400)
  })
})
