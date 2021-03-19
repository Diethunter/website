import test from 'japa'
import supertest from 'supertest'
import User from "App/Models/User"

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group("Test user authentication", async function() {
  test("Test user registration", async function(assert) {
    let { text }: any = await supertest(BASE_URL)
    .post("/auth/register")
    .send({ "username": "AvidCoder123", "password": "supersecretpassword"})
    .expect(200)

    text = JSON.parse(text)

    assert.exists(text.token)

    let registered = await User.findBy("username", "AvidCoder123")

    assert.exists(registered)
  })
})
