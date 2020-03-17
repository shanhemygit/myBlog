var blogDao = require("../dao/blogDao");

function serverBlogInsert(data, success) {
    blogDao.blogInsert(data, success)
}

module.exports.serverBlogInsert = serverBlogInsert