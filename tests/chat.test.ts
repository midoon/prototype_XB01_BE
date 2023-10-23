import supertest from "supertest";
import {
  connectMongoServerTest,
  disconnectMongoServerTest,
  createUser,
} from "./test-util";
import app from "../src/application/web";

// const createUser = async () => {
//   await supertest(app).post("/api/user/register").send({
//     username: "test1",
//     email: "test1@gmail.com",
//     password: "12345678",
//   });
// };

describe("POST /api/chat", () => {
  beforeAll(async () => {
    await connectMongoServerTest();
    await createUser();
  });

  afterAll(async () => {
    await disconnectMongoServerTest();
  });

  it("should can create new chat", async () => {
    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const user2 = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const accessToken = loggedUser.body.data.access_token;
    const result = await supertest(app)
      .post("/api/chat/")
      .send({
        user_id: user2.body.data.user_id,
      })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data).toBeDefined();
  });

  it("should can fetch chat", async () => {
    // @describe the chat data is created in first test case
    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const user2 = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const accessToken = loggedUser.body.data.access_token;
    const result = await supertest(app)
      .post("/api/chat/")
      .send({
        user_id: user2.body.data.user_id,
      })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data).toBeDefined();
  });

  it("should reject if user unauthorized", async () => {
    const user2 = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });
    const result = await supertest(app).post("/api/chat/").send({
      user_id: user2.body.data.user_id,
    });

    expect(result.status).toBe(403);
    expect(result.body.status_response).toBe(false);
  });

  it("should reject if user_id reciever not found", async () => {
    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const accessToken = loggedUser.body.data.access_token;
    const result = await supertest(app)
      .post("/api/chat/")
      .send({
        user_id: "salah",
      })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(result.status).toBe(400);
    expect(result.body.status_response).toBe(false);
  });
});
