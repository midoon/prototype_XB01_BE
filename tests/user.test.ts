import supertest from "supertest";
import { connectMongoServerTest, disconnectMongoServerTest } from "./test-util";
import app from "../src/application/web";

describe("POST: /api/user/register", () => {
  beforeAll(async () => {
    await connectMongoServerTest();
  });

  afterAll(async () => {
    await disconnectMongoServerTest();
  });

  it("should can register new user", async () => {
    const result = await supertest(app).post("/api/user/register").send({
      username: "test",
      email: "test@gmail.com",
      password: "12345678",
    });

    expect(result.status).toBe(201);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data._id).toBeDefined();
  });

  it("should reject register if email exist in DB", async () => {
    // data dengan test@gmail.com telah dibuat pada test case sebelumnya
    const result = await supertest(app).post("/api/user/register").send({
      username: "test",
      email: "test@gmail.com",
      password: "12345678",
    });

    expect(result.status).toBe(400);
    expect(result.body.status_response).toBe(false);
  });

  it("should reject regiter if the body field empty", async () => {
    const result = await supertest(app).post("/api/user/register");

    expect(result.status).toBe(400);
    expect(result.body.status_response).toBe(false);
  });
});

describe("POST /api/user/login", () => {
  beforeAll(async () => {
    await connectMongoServerTest();
  });

  afterAll(async () => {
    await disconnectMongoServerTest();
  });

  it("should can login user", async () => {
    await supertest(app).post("/api/user/register").send({
      username: "test",
      email: "test@gmail.com",
      password: "12345678",
    });

    const result = await supertest(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "12345678",
    });

    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data.user_id).toBeDefined();
    expect(result.body.data.access_token).toBeDefined();
    expect(result.body.data.refresh_token).toBeDefined();
  });

  it("should reject login if email wrong", async () => {
    const result = await supertest(app).post("/api/user/login").send({
      email: "salah@gmail.com",
      password: "12345678",
    });

    expect(result.status).toBe(404);
    expect(result.body.status_response).toBe(false);
    expect(result.body.message).toBe("Email or password wrong");
  });

  it("should reject login if password wrong", async () => {
    const result = await supertest(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "passwordsalah",
    });

    expect(result.status).toBe(404);
    expect(result.body.status_response).toBe(false);
    expect(result.body.message).toBe("Email or password wrong");
  });

  it("should reject login if req body field is empty", async () => {
    const result = await supertest(app).post("/api/user/login");

    expect(result.status).toBe(400);
    expect(result.body.status_response).toBe(false);
  });
});
