var commentDao = require("../dao/commentDao")

function addComment(blog_id, parent, parent_name, user_name, comments, email, ctime, utime, success) {
    var data = [blog_id, parent, parent_name, user_name, comments, email, ctime, utime]
    commentDao.addComment(data, success)
}

function queryCommentByBlogId(blog_id, success) {
    var data = [blog_id]
    commentDao.queryCommentByBlogId(data, success)
}

function queryNewComments(size, success) {
    var data = [size];
    commentDao.queryNewComments(data, success)
}
module.exports.queryNewComments = queryNewComments
module.exports.queryCommentByBlogId = queryCommentByBlogId
module.exports.addComment = addComment