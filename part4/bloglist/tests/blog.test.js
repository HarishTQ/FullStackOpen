const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const api = supertest(app);
const blog = require("../models/blog");

beforeEach(async () => {
  await blog.deleteMany({});
  const newBLog = new blog({
    name: "smg",
    author: "smh",
    url: "sma",
    likes: 10,
  });
  await newBLog.save();
});

describe("Testing blog api", () => {
  test("GET /api/blogs", async () => {
    const result = await api
      .get("/api/blogs")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(result.body.length).toEqual(1);
  });

  test("Check if the field id is defined", async () => {
    const result = await api
      .get("/api/blogs")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(result.body[0].id).toBeDefined();
  });

  test("Check if saving of new blogs is successful", async () => {
    const initialBlog = await blog.find({});
    const newBlog = {
      title: "qq",
      author: "ddd",
      url: "dd",
      likes: 10,
    };
    const result = await api.post("/api/blogs").send(newBlog).expect(201);
    const updateBlogs = await blog.find({});
    expect(updateBlogs.length).toBe(initialBlog.length + 1);
  });

  test("Checkinf if the like property missing is defaulted to zero", async () => {
    const newBlog = {
      title: "qq",
      author: "ddd",
      url: "dd",
    };
    const result = await api.post("/api/blogs").send(newBlog).expect(201);
    expect(result.body.likes).toBe(0);
  });

  test("return 400 if title is missing from the request", async () => {
    const newBlog = {
      title: "s",
      likes: 90,
    };
    const result = await api.post("/api/blogs").send(newBlog);
    expect(result.statusCode).toBe(400);
  });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});
