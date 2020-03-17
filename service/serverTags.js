var tagDao = require("../dao/tagDao");

function queryRandomTags(start, size, success) {
    var data = [start, size]
    tagDao.queryRandomTags(data, success)

}

function queryRandomTagsDESC(start, size, success) {
    var data = [start, size]
    tagDao.queryRandomTags(data, success)

}

function queryTagCount(success) {
    tagDao.queryTagCount(success)
}
module.exports.queryRandomTagsDESC = queryRandomTagsDESC
module.exports.queryTagCount = queryTagCount
module.exports.queryRandomTags = queryRandomTags