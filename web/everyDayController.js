var path = new Map()
var serverEveryDay = require("../service/serverEveryDay");
var timeUtil = require("../util/timeUtil")
var resultUtil = require("../util/resultUtil")

function editEveryDay(request, response) {
    request.on("data", function(data) {
        var arr = [data.toString().trim(), timeUtil.getDate()]
        serverEveryDay.serverEveryDayInsert(arr, function(result) {
            response.writeHead(200);
            response.write(resultUtil.writeResult("success", "添加成功", null));
            response.end();
        })
    })
}

function queryEveryDay(request, response) {
    serverEveryDay.serverQueryEveryDay(function(result) {
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查找成功", result))
        response.end()
    })
}
path.set("/editEveryDay", editEveryDay)
path.set("/queryEveryDay", queryEveryDay)
module.exports.path = path