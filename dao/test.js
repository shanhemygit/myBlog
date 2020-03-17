var dbutil = require("./dbutil")

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
queryTagCount(function(result) {
    console.log(result[0]["count(id)"])
})