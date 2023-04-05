const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res, next) => {
  const result = await Blog.find({});
  res.json(result);
});

blogRouter.post("/", async (req, res, next) => {
  const blog = new Blog(req.body);
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

module.exports = blogRouter;
