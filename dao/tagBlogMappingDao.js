var dbutil = require("./dbutil");

function insertTagBlogMapping(data, success) {
    var sql = "insert into tags_blog_mapping (tag_id,blog_id,ctime,utime) values(?,?,?,?)";
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

module.exports.insertTagBlogMapping = insertTagBlogMapping