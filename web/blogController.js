var serverEditBlog = require("../service/serverEditBlog");
var url = require("url")
var serverBlog = require("../service/serverBlog")
var tagsUtil = require("../util/tagsUtil");
var timeUtil = require("../util/timeUtil");
var resultUtil = require("../util/resultUtil");
var tagDao = require("../dao/tagDao");
var tagBlogMappingDao = require("../dao/tagBlogMappingDao");
var path = new Map()

function editBlog(request, response) {
    var params = url.parse(request.url, true).query;
    request.on("data", function(data) {
        var tags = tagsUtil.tagParse(params.tag);
        var arr = [params.title.trim(), data.toString().trim(), 0, tags, timeUtil.getDate(), timeUtil.getDate()];
        serverEditBlog.serverBlogInsert(arr, function(result) {
            response.writeHead(200);
            response.write(resultUtil.writeResult("success", "编辑成功", null));
            response.end()
            var blogId = result.insertId;

            var tagList = tags.split(",");
            for (var i = 0; i < tagList.length; i++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        })

    })
}

function queryTag(tag, blogId) {
    var arr = [tag]
    tagDao.queryTag(arr, function(result) {
        if (result == null || result.length == 0) {
            tagInsert(tag, blogId);
        } else {

            var paramsArr = [result[0].id, blogId, timeUtil.getDate(), timeUtil.getDate()]
            tagBlogMappingDao.insertTagBlogMapping(paramsArr, function(resulet) {})
        }
    })
}

function tagInsert(tag, blogId) {
    var arr = [tag, timeUtil.getDate(), timeUtil.getDate()];
    tagDao.tagInsert(arr, function(result) {
        insertTagBlogMapping(result.insertId, blogId);
    })
}

function insertTagBlogMapping(tagId, blogId) {
    var arr = [tagId, blogId, timeUtil.getDate(), timeUtil.getDate()];
    tagBlogMappingDao.insertTagBlogMapping(arr, function(resulet) {})
}

function queryArticle(request, response) {
    var params = url.parse(request.url, true).query
    serverBlog.queryBlogArticle(params.page, params.pageSize, function(result) {
        if (result.length >= 1) {
            for (var i = 0; i < result.length; i++) {

                result[i].content = result[i].content.replace(/<img[\w\W]*">/g, "");
                // result[i].content = result[i].content.replace(/<[\w\W]">/g, "");
                result[i].content = result[i].content.substring(0, 300);

            }
            response.writeHead(200);
            response.write(resultUtil.writeResult("success", "ok", result));
            response.end()
        }

    })
}

function queryBlogCount(request, response) {
    serverBlog.queryBlogCount(function(result) {
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "ok", result))
        response.end();
    })
}

function queryBlogArticleById(request, response) {
    var params = url.parse(request.url, true).query
    serverBlog.queryBlogArticleById(params.id, function(result) {
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "ok", result));
        response.end()
    })

}

function addView(request, response) {
    var params = url.parse(request.url, true).query
    serverBlog.addView(params.id, function(result) {
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", null))
        response.end()
    })

}

function queryHotBlogByView(request, response) {
    var params = url.parse(request.url, true).query;
    serverBlog.queryHotBlogByView(parseInt(params.size), function(result) {
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", result));
        response.end()
    })

}

function queryBlogByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tagDao.queryTag(params.tag, function(result) {
        if (result[0] == null || result.length < 1) {
            response.writeHead(200);
            response.write(resultUtil.writeResult("success", "查询成功", null))
            response.end()
        } else {
            queryBlogIdByTagId(result[0].id, parseInt(params.page), parseInt(params.pageSize), response)
        }
    })
}

function queryBlogIdByTagId(tagId, page, pageSize, response) {
    var blogList = []
    serverBlog.queryBlogIdByTagId(tagId, page * pageSize, pageSize, function(result) {
        if (resultUtil == null || result.length < 1) {
            response.writeHead(200);
            response.write(resultUtil.writeResult("success", "查询成功", null))
            response.end()
        } else {
            for (var i = 0; i < result.length; i++) {
                serverBlog.queryBlogArticleById(result[i].blog_id, function(result) {
                    blogList.push(result[0])
                })
            }
        }
        getResult(blogList, result.length, response)
    })
}

function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(() => {
            getResult(blogList, len, response)
        }, 10);
    } else {
        response.writeHead(200);
        response.write(resultUtil.writeResult("success", "查询成功", blogList))
        response.end()
    }

}

function queryBlogCountByTagId(request, response) {
    var params = url.parse(request.url, true).query;
    tagDao.queryTag(params.tag, function(result) {
        serverBlog.queryBlogCountByTagId(result[0].id, function(result) {
            response.writeHead(200);
            response.write(resultUtil.writeResult("success", "查询成功", result[0]))
            response.end()
        })
    })
}
path.set("/queryBlogCountByTagId", queryBlogCountByTagId)
path.set("/queryBlogByTag", queryBlogByTag)
path.set("/queryHotBlogByView", queryHotBlogByView)
path.set("/addView", addView)
path.set("/queryBlogArticleById", queryBlogArticleById);
path.set("/queryArticle", queryArticle)
path.set("/editBlog", editBlog);
path.set("/queryBlogCount", queryBlogCount)
module.exports.path = path