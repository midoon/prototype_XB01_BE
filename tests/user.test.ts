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
