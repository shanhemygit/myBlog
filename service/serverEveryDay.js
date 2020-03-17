var everyDayDao = require("../dao/everyDayDao");

function serverEveryDayInsert(data, success) {
    everyDayDao.everyDayInsert(data, success)
}

function serverQueryEveryDay(success) {
    everyDayDao.queryEveryDay(success)
}
module.exports.serverEveryDayInsert = serverEveryDayInsert
module.exports.serverQueryEveryDay = serverQueryEveryDay