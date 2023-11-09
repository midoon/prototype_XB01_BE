import supertest from "supertest";
import {
  connectMongoServerTest,
  disconnectMongoServerTest,
  createUser,
  getAllUserId,
} from "./test-util";
import app from "../src/application/web";

// create new message in chat
describe("POST: /api/message", () => {
  beforeAll(async () => {
    await connectMongoServerTest();
    await createUser();
  });

  afterAll(async () => {
    await disconnectMongoServerTest();
  });

  it("should can create new message", async () => {
    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const user2 = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const accessToken = loggedUser.body.data.access_token;
    const chat = await supertest(app)
      .post("/api/chat/")
      .send({
        userId: user2.body.data.user_id,
      })
      .set("Authorization", `Bearer ${accessToken}`);

    const result = await supertest(app)
      .post("/api/message")
      .send({
        chatId: chat.body.data._id,
        content: "ini test message",
      })
      .set("Authorization", `Bearer ${accessToken}`);

    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data).toBeDefined();
  });
});

describe("GET: /api/message/:chatId", () => {
  beforeAll(async () => {
    await connectMongoServerTest();
    await createUser();
  });

  afterAll(async () => {
    await disconnectMongoServerTest();
  });
  it("should can get all message", async () => {
    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const user2 = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const accessToken = loggedUser.body.data.access_token;
    const chat = await supertest(app)
      .post("/api/chat/")
      .send({
        userId: user2.body.data.user_id,
      })
      .set("Authorization", `Bearer ${accessToken}`);

    const message = await supertest(app)
      .post("/api/message")
      .send({
        chatId: chat.body.data._id,
        content: "ini test message",
      })
      .set("Authorization", `Bearer ${accessToken}`);

    const result = await supertest(app)
      .get(`/api/message/${chat.body.data._id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data).toBeDefined();
  });
});
