import supertest from "supertest";
import {
  connectMongoServerTest,
  disconnectMongoServerTest,
  createUser,
  getAllUserId,
} from "./test-util";
import app from "../src/application/web";

// create and fetch one chat
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
        userId: user2.body.data.user_id,
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
        userId: user2.body.data.user_id,
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

// fetch all chat
describe("GET: /api/chat", () => {
  beforeAll(async () => {
    await connectMongoServerTest();
    await createUser();
  });

  afterAll(async () => {
    await disconnectMongoServerTest();
  });
  it("should can fetch all chat", async () => {
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
        user_id: user2.body.data.user_id,
      })
      .set("Authorization", `Bearer ${accessToken}`);

    const result = await supertest(app)
      .get("/api/chat")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data).toBeDefined();
  });

  it("should reject if user unauthorized", async () => {
    const result = await supertest(app).get("/api/chat");

    expect(result.status).toBe(403);
    expect(result.body.status_response).toBe(false);
  });
});

// create Group
describe("POST: /api/chat/group", () => {
  beforeAll(async () => {
    await connectMongoServerTest();
    await createUser();
  });

  afterAll(async () => {
    await disconnectMongoServerTest();
  });

  it("should can create user group", async () => {
    const uid = await getAllUserId();
    const uidArr = [uid.id2.toString(), uid.id3.toString()];
    const uidArrStr = JSON.stringify(uidArr);

    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const accessToken = loggedUser.body.data.access_token;

    const result = await supertest(app)
      .post("/api/chat/group")
      .send({
        groupName: "testGroup",
        users: uidArrStr,
      })
      .set("Authorization", `Bearer ${accessToken}`);

    expect(result.body.data.groupAdmin._id).toBe(loggedUser.body.data.user_id);
    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data).toBeDefined();
  });

  it("should can create user group", async () => {
    const uid = await getAllUserId();
    const uidArr = [uid.id2.toString(), uid.id3.toString()];
    const uidArrStr = JSON.stringify(uidArr);

    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const accessToken = loggedUser.body.data.access_token;

    const result = await supertest(app)
      .post("/api/chat/group")
      .send({
        groupName: "testGroup",
        users: uidArrStr,
      })
      .set("Authorization", `Bearer ${accessToken}`);

    expect(result.status).toBe(200);
    expect(result.body.status_response).toBe(true);
    expect(result.body.data).toBeDefined();
  });

  it("should reject create user group if member less than 2", async () => {
    const uid = await getAllUserId();
    const uidArr = [uid.id2.toString()];
    const uidArrStr = JSON.stringify(uidArr);

    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const accessToken = loggedUser.body.data.access_token;

    const result = await supertest(app)
      .post("/api/chat/group")
      .send({
        groupName: "testGroup",
        users: uidArrStr,
      })
      .set("Authorization", `Bearer ${accessToken}`);

    expect(result.status).toBe(400);
    expect(result.body.status_response).toBe(false);
  });

  it("should reject create user group if member id not found", async () => {
    const uid = await getAllUserId();
    const uidArr = [uid.id2.toString(), "salah id"];
    const uidArrStr = JSON.stringify(uidArr);

    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const accessToken = loggedUser.body.data.access_token;

    const result = await supertest(app)
      .post("/api/chat/group")
      .send({
        groupName: "testGroup",
        users: uidArrStr,
      })
      .set("Authorization", `Bearer ${accessToken}`);

    expect(result.status).toBe(400);
    expect(result.body.status_response).toBe(false);
  });

  it("should reject create user group if empty req body", async () => {
    const uid = await getAllUserId();
    const uidArr = [uid.id2.toString(), "salah id"];
    const uidArrStr = JSON.stringify(uidArr);

    const loggedUser = await supertest(app).post("/api/user/login").send({
      email: "test1@gmail.com",
      password: "12345678",
    });

    const accessToken = loggedUser.body.data.access_token;

    const result = await supertest(app)
      .post("/api/chat/group")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(result.status).toBe(400);
    expect(result.body.status_response).toBe(false);
  });

  it("should reject create user group if user unauthorized", async () => {
    const uid = await getAllUserId();
    const uidArr = [uid.id2.toString(), "salah id"];
    const uidArrStr = JSON.stringify(uidArr);

    const result = await supertest(app).post("/api/chat/group").send({
      groupName: "testGroup",
      users: uidArrStr,
    });

    expect(result.status).toBe(403);
    expect(result.body.status_response).toBe(false);
  });
});
