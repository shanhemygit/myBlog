var dbutil = require("./dbutil");

function blogInsert(data, success) {
    var sql = "insert into blog (title,content,views,tags,ctime,utime) values(?,?,?,?,?,?)"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, data, function(error, result) {
        if (result) {
            success(result)
        } else {
            throw new Error(error)
        }
    })

}

function queryArtcile(data, success) {
    var sql = "select * from blog order by id limit ?,?"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, data, function(error, result) {
        if (result) {
            success(result)
        } else {
            throw new Error(error)
        }
    });
    connection.end();
}

function queryBlogCount(success) {
    var sql = "select count(id) from blog";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, function(error, result) {
        if (result) {
            success(result);
        } else {
            throw new Error(error)
        }
    })
    connection.end()
}


function queryBlogArticleById(data, success) {
    var sql = "select * from blog where id=?"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, [data], function(error, result) {
        if (result) {
            success(result)
        } else {
            throw new Error(error)
        }
    });
    connection.end()
}

function addView(data, success) {
    var sql = "update blog set views = views+1 where id=?";
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

function queryHotBlogByView(data, success) {

    var sql = "select * from blog order by views desc limit ?"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, data, function(error, result) {
        if (result) {
            success(result)
        } else {
            throw new Error(error)
        }
    })

}

function queryBlogIdByTagId(data, success) {
    var sql = "select * from tags_blog_mapping where tag_id=? limit ?,?"
    var connection = dbutil.createConnection();
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

function queryBlogCountByTagId(data, success) {
    var sql = "select count(tag_id) from tags_blog_mapping where tag_id=?"
    var connection = dbutil.createConnection();
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
module.exports.queryBlogCountByTagId = queryBlogCountByTagId
module.exports.queryBlogIdByTagId = queryBlogIdByTagId
module.exports.queryHotBlogByView = queryHotBlogByView
module.exports.addView = addView
module.exports.blogInsert = blogInsert
module.exports.queryArtcile = queryArtcile
module.exports.queryBlogCount = queryBlogCount
module.exports.queryBlogArticleById = queryBlogArticleById