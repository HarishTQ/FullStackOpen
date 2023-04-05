const blogRouter = require("express").Router();
const blog = require("../models/blog");
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

blogRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const result = await Blog.findByIdAndDelete(id);
  console.log(result);
  res.json(result).status(204).end();
});

blogRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const newblog = req.body;
  const result = await Blog.findByIdAndUpdate(id, newblog, { new: true });
  console.log(result);
  res.json(result).status(201).end();
});

module.exports = blogRouter;
