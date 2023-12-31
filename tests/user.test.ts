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
    await supertest(app).post("/api/user/register").send({
      username: "test",
      email: "test@gmail.com",
      password: "12345678",
    });
  });

  afterAll(async () => {
    await disconnectMongoServerTest();
  });

  it("should can login user", async () => {
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

describe("POST: /api/user/refresh", () => {
  beforeAll(async () => {
    await connectMongoServerTest();
    await supertest(app).post("/api/user/register").send({
      username: "test",
      email: "test@gmail.com",
      password: "12345678",
    });
  });

  afterAll(async () => {
    await disconnectMongoServerTest();
  });

  it("should can login user", async () => {
    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "12345678",
    });

    const result = await supertest(app).post("/api/user/refresh").send({
      refresh_token: loggedUser.body.data.refresh_token,
    });

    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data.access_token).toBeDefined();
  });

  it("should reject if req body field is empty", async () => {
    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "12345678",
    });

    const result = await supertest(app).post("/api/user/refresh");

    expect(result.status).toBe(400);
    expect(result.body.status_response).toBe(false);
    expect(result.body.error).toBe("Validation Error");
  });
});

describe("POST: /api/user/logout", () => {
  beforeAll(async () => {
    await connectMongoServerTest();
    await supertest(app).post("/api/user/register").send({
      username: "test",
      email: "test@gmail.com",
      password: "12345678",
    });
  });

  afterAll(async () => {
    await disconnectMongoServerTest();
  });

  it("should can logout user", async () => {
    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "12345678",
    });

    const result = await supertest(app)
      .post("/api/user/logout")
      .set("Authorization", `Bearer ${loggedUser.body.data.access_token}`);

    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
  });

  it("should reject logout user if double logout", async () => {
    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "12345678",
    });

    await supertest(app)
      .post("/api/user/logout")
      .set("Authorization", `Bearer ${loggedUser.body.data.access_token}`);

    const result = await supertest(app)
      .post("/api/user/logout")
      .set("Authorization", `Bearer ${loggedUser.body.data.access_token}`);

    expect(result.status).toBe(403);
    expect(result.body.status_response).toBe(false);
  });

  it("should reject logout if without access token", async () => {
    const result = await supertest(app).post("/api/user/logout");

    expect(result.status).toBe(403);
    expect(result.body.status_response).toBe(false);
  });
});

describe("GET: /api/user", () => {
  beforeAll(async () => {
    await connectMongoServerTest();
    await supertest(app).post("/api/user/register").send({
      username: "test",
      email: "test@gmail.com",
      password: "12345678",
    });
    await supertest(app).post("/api/user/register").send({
      username: "test2",
      email: "test2@gmail.com",
      password: "12345678",
    });
    await supertest(app).post("/api/user/register").send({
      username: "coba",
      email: "coba@gmail.com",
      password: "12345678",
    });
  });

  afterAll(async () => {
    await disconnectMongoServerTest();
  });

  it("should can get list user without query params", async () => {
    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "12345678",
    });

    const result = await supertest(app)
      .get("/api/user")
      .set("Authorization", `Bearer ${loggedUser.body.data.access_token}`);

    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data.length).toBe(2);
  });

  it("should can get list user with query params", async () => {
    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "12345678",
    });

    const result = await supertest(app)
      .get("/api/user")
      .set("Authorization", `Bearer ${loggedUser.body.data.access_token}`)
      .query({ search: "coba" });

    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data.length).toBe(1);
  });

  it("should can get zero list user with query params that no user stored", async () => {
    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "12345678",
    });

    const result = await supertest(app)
      .get("/api/user")
      .set("Authorization", `Bearer ${loggedUser.body.data.access_token}`)
      .query({ search: "salah" });

    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data.length).toBe(0);
  });
});
