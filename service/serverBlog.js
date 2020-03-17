var blogDao = require("../dao/blogDao")

function queryBlogArticle(page, pageSize, success) {
    var arr = [page * pageSize, +pageSize]
    blogDao.queryArtcile(arr, success)
}

function queryBlogCount(success) {
    blogDao.queryBlogCount(success)
}

function queryBlogArticleById(data, success) {
    blogDao.queryBlogArticleById(data, success)
}

function addView(id, success) {
    var data = [id];
    blogDao.addView(data, success)
}

function queryHotBlogByView(size, success) {
    var data = [size]
    blogDao.queryHotBlogByView(data, success);
}

function queryBlogIdByTagId(tagid, page, pageSize, success) {
    var data = [tagid, page, pageSize]
    blogDao.queryBlogIdByTagId(data, success)

}

function queryBlogCountByTagId(tagid, success) {
    var data = [tagid]
    blogDao.queryBlogCountByTagId(data, success)
}
module.exports.queryBlogCountByTagId = queryBlogCountByTagId
module.exports.queryBlogIdByTagId = queryBlogIdByTagId
module.exports.queryHotBlogByView = queryHotBlogByView
module.exports.addView = addView
module.exports.queryBlogArticle = queryBlogArticle
module.exports.queryBlogCount = queryBlogCount
module.exports.queryBlogArticleById = queryBlogArticleById