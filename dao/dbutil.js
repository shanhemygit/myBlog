var mysql = require("mysql");

function createConnection() {
    return mysql.createConnection({
        port: "3306",
        host: "127.0.0.1",
        password: "123",
        user: "root",
        database: "my_blog"
    })
}

module.exports.createConnection = createConnection