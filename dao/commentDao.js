var dbutil = require("./dbutil")

function addComment(data, success) {
    var connection = dbutil.createConnection();
    var sql = "insert into comments (blog_id,parent,parent_name,user_name,comments,email,ctime,utime)values(?,?,?,?,?,?,?,?)"
    connection.connect();
    connection.query(sql, data, function(error, result) {
        if (result) {
            success(result)
        } else {
            throw new Error(error)
        }
    })
    connection.end()
}

function queryCommentByBlogId(data, success) {
    // console.log(data)
    var sql = "select* from comments where blog_id=?"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, data, function(error, result) {
        if (result) {
            success(result)
        } else {
            throw new Error(error)
        }
    });
    connection.end()
}

function queryNewComments(data, success) {
    var sql = "select* from comments where parent = -1 order by id desc limit ?"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, data, function(error, result) {
        if (result) {
            success(result)
        } else {
            throw new Error(error)
        }
    });
    connection.end()
}
module.exports.queryNewComments = queryNewComments
module.exports.queryCommentByBlogId = queryCommentByBlogId
module.exports.addComment = addComment