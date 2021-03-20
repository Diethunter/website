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

  test("Test validating required fields", async function(assert) {
    await supertest(BASE_URL)
    .post("/auth/register")
    .send({username: "SomeRandomUser"})
    .expect(422);

    let incorrectUser = await User.findBy("username", "SomeRandomUser")

    assert.notExists(incorrectUser)

  })

  test("Prevent duplicate users", async function(assert) {
    await supertest(BASE_URL)
    .post("/auth/register")
    .send({username: "DuplicateUser1", password: "supersecretpassword"})
    .expect(200);

    await supertest(BASE_URL)
    .post("/auth/register")
    .send({username: "DuplicateUser1", password: "supersecretpassword"})
    .expect(422);

    let dupes = await User.findBy("username", "DuplicateUser1")

    assert.exists(dupes)
  })
})
