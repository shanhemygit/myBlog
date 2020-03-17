var dbutil = require("./dbutil");

function queryTag(data, success) {
    var sql = "select * from tags where tag=?"
    var connnection = dbutil.createConnection();
    connnection.connect();
    connnection.query(sql, data, function(error, result) {
        if (result) {
            success(result);
        } else {
            throw new Error(error)
        }
    });
    connnection.end();
}

function tagInsert(data, success) {
    var sql = "insert into tags (tag,ctime,utime)values(?,?,?)"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, data, function(error, result) {
        if (result) {
            success(result);
        } else {
            throw new Error(error)
        }
    });
    connection.end()
}

function queryRandomTags(data, success) {
    var sql = "select * from tags order by id limit ?,?"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, data, function(error, result) {
        if (result) {
            success(result);
        } else {
            throw new Error(error)
        }
    });
    connection.end()
}

function queryRandomTagsDESC(data, success) {
    var sql = "select * from tags order by id desc limit ?,?"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, data, function(error, result) {
        if (result) {
            success(result);
        } else {
            throw new Error(error)
        }
    });
    connection.end()
}

function queryTagCount(success) {
    sql = "select count(id) from tags"
    var connnection = dbutil.createConnection();
    connnection.connect();
    connnection.query(sql, function(error, result) {
        if (result) {
            success(result);
        } else {
            throw new Error(error)
        }
    });
    connnection.end();
}
module.exports.queryRandomTags = queryRandomTagsDESC
module.exports.queryTagCount = queryTagCount
module.exports.queryRandomTags = queryRandomTags
module.exports.queryTag = queryTag
module.exports.tagInsert = tagInsert