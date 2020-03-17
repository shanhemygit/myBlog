var serverComment = require("../service/serverComment");
var timeUtil = require("../util/timeUtil");
var resultUtil = require("../util/resultUtil")
var url = require("url");
var svgCaptcha = require("svg-captcha");
var path = new Map()

function addComment(request, response) {
    var params = url.parse(request.url, true).query
    serverComment.addComment(params.bid, params.reply, params.replyName, params.nickname, params.content, params.email, timeUtil.getDate(), timeUtil.getDate(), function(result) {
        if (result != null) {
            response.writeHead(200);
            response.write(resultUtil.writeResult("success", "评论成功", result))
            response.end()
        }
    })
}

function randomCode(request, response) {
    var data = svgCaptcha.create({
        size: 5,
        noise: 2,
        width: 80,
        height: 30,
        fontSize: 30,
        color: true,
        background: '#999'

    })
    response.writeHead(200);
    response.write(resultUtil.writeResult("success", "生成成功", data));
    response.end()

}

function queryCommentByBlogId(request, response) {
    var params = url.parse(request.url, true).query
    serverComment.queryCommentByBlogId(params.id, function(result) {
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}

function queryNewComments(request, response) {
    var params = url.parse(request.url, true).query
    serverComment.queryNewComments(parseInt(params.size), function(result) {
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}
path.set("/queryNewComments", queryNewComments)
path.set("/queryCommentByBlogId", queryCommentByBlogId)
path.set("/randomCode", randomCode)
path.set("/addComment", addComment)
module.exports.path = path