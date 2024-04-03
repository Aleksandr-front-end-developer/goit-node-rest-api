import mongoose from "mongoose";
import app from "../app.js";
import request from "supertest";
import { User } from "../models/user.js";

const { DB_TEST_HOST } = process.env;

describe("test /api/users/login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.createConnection(DB_TEST_HOST);
    server = app.listen(4000);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  const userData = {
    email: "example@example.ua",
    password: "example1234567",
  };

  beforeEach(async () => {
    await request(app).post("/api/users/register").send(userData);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  test("test /api/users/login with correctData", async () => {
    const {
      statusCode,
      body: { user, token },
    } = await request(app).post("/api/users/login").send(userData);

    expect(statusCode).toBe(200);
    expect(user.email).toBe(userData.email);
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
    expect(token).not.toBeUndefined();
    expect(token).not.toBeNull();
    expect(token).not.toBe("");

    const dbUser = await User.findOne({ email: userData.email });
    expect(dbUser.subscription).toBe(user.subscription);
  });
});
