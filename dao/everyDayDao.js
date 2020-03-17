var dbutil = require("./dbutil");

function everyDayInsert(data, success) {
    var sql = "insert into every_day (content,ctime) values(?,?)"
    var connection = dbutil.createConnection()
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

function queryEveryDay(success) {
    var sql = "select content from every_day order by id desc limit 1"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, function(error, result) {
        if (result) {
            success(result)
        } else {
            throw new Error(error);
        }
    })
    connection.end()
}
module.exports.everyDayInsert = everyDayInsert
module.exports.queryEveryDay = queryEveryDay