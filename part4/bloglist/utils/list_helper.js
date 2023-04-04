const _ = require("lodash");
const dummyData = require("../tests/MOCK_DATA");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const result = blogs.reduce((t, c) => {
    return t + c.likes;
  }, 0);
  return result;
};

const favoriteBlog = (blogs) => {
  let max = 0;
  let obj = {};
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > max) {
      max = blogs[i].likes;
      obj = blogs[i];
    }
  }
  return obj;
};

const mostBlogs = (blogs) => {
  if (blogs.count == 0) {
    return {};
  }
  const blogsByAuthor = _.groupBy(blogs, "author");
  const blogsCountByAuthor = _.mapValues(
    blogsByAuthor,
    (blogs) => blogs.length
  );
  const topAuthor = _.maxBy(
    _.keys(blogsCountByAuthor),
    (author) => blogsCountByAuthor[author]
  );
  return { author: topAuthor, blogs: blogsCountByAuthor[topAuthor] };
};

const mostLikes = (blogs) => {
  if (blogs.count == 0) {
    return {};
  }
  const blogsByAuthor = _.groupBy(blogs, "author");
  const likesByAuthor = _.mapValues(blogsByAuthor, (blogs) =>
    _.sumBy(blogs, "likes")
  );
  const topAuthor = _.maxBy(
    _.keys(blogsByAuthor),
    (author) => likesByAuthor[author]
  );
  return { author: topAuthor, likes: likesByAuthor[topAuthor] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
