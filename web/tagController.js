var url = require("url");
var serverTags = require("../service/serverTags")
var resultUtil = require("../util/resultUtil")
var path = new Map()

function queryRandomTags(request, response) {
    var params = url.parse(request.url, true).query
    queryTagCount(params.size, response)
        // var tagsCount = queryTagCount()
        // var pageCount = Math.ceil(tagsCount / params.size)
        // var randomStartNumb = Math.floor(Math.random() * pageCount)
        // console.log(params.size, tagsCount, pageCount, randomStartNumb)
        // if (params.size >= tagsCount) {
        //     serverTags.queryRandomTags(0, parseInt(params.size), function(result) {
        //         response.writeHead(200);
        //         response.write(resultUtil.writeResult("success", "查询成功", randomTag(result)))
        //         response.end()
        //     })
        // } else {
        //     if (randomStartNumb == pageCount - 1) {
        //         serverTags.queryRandomTagsDESC(0, parseInt(params.size), function(result) {
        //             response.writeHead(200);
        //             response.write(resultUtil.writeResult("success", "查询成功", randomTag(result)))
        //             response.end()
        //         })
        //     } else {
        //         serverTags.queryRandomTags(randomStartNumb, parseInt(params.size), function(result) {
        //             response.writeHead(200);
        //             response.write(resultUtil.writeResult("success", "查询成功", randomTag(result)))
        //             response.end()
        //         })
        //     }

    // }


}

function queryTagCount(pageSize, response) {
    var size = parseInt(pageSize)
    serverTags.queryTagCount(function(result) {
        var tagsCount = result[0]["count(id)"]
        var pageCount = Math.ceil(tagsCount / size)
        var randomStartNumb = Math.floor(Math.random() * pageCount)

        if (size >= tagsCount) {
            serverTags.queryRandomTags(0, parseInt(size), function(result) {
                response.writeHead(200);
                response.write(resultUtil.writeResult("success", "查询成功", randomTag(result)))
                response.end()
            })

        } else {
            if (randomStartNumb == pageCount - 1) { //降序查询

                serverTags.queryRandomTagsDESC(0, parseInt(size), function(result) {
                    response.writeHead(200);
                    response.write(resultUtil.writeResult("success", "查询成功", randomTag(result)))
                    response.end()
                })
            } else {
                serverTags.queryRandomTags(randomStartNumb * size, parseInt(size), function(result) {
                    response.writeHead(200);
                    response.write(resultUtil.writeResult("success", "查询成功", randomTag(result)))
                    response.end()
                })
            }
        }
    })
}

function randomTag(tags) {
    if (tags.length > 1) {
        return tags.sort(function(a, b) {
            return Math.random() * 10 > 5 ? -1 : 1;
        });
    } else {
        return tags;
    }
}
path.set("/queryRandomTags", queryRandomTags)

module.exports.path = path