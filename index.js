const express = require("express")
const config = require("./config.js")
const loader = require("./loader");

let app = new express()
app.use(express.static("./page"))
app.post("/editEveryDay", loader.pathMap.get("/editEveryDay"));
app.get("/queryEveryDay", loader.pathMap.get("/queryEveryDay"));
app.post("/editBlog", loader.pathMap.get("/editBlog"))
app.get("/queryArticle", loader.pathMap.get("/queryArticle"));
app.get("/queryBlogCount", loader.pathMap.get("/queryBlogCount"));
app.get("/queryBlogArticleById", loader.pathMap.get("/queryBlogArticleById"));
app.get("/addComment", loader.pathMap.get("/addComment"))
app.post("/randomCode", loader.pathMap.get("/randomCode"))
app.get("/queryCommentByBlogId", loader.pathMap.get("/queryCommentByBlogId"));
app.get("/addView", loader.pathMap.get("/addView"));
app.get("/queryRandomTags", loader.pathMap.get("/queryRandomTags"))
app.get("/queryHotBlogByView", loader.pathMap.get("/queryHotBlogByView"))
app.get("/queryNewComments", loader.pathMap.get("/queryNewComments"))

app.get("/queryBlogByTag", loader.pathMap.get("/queryBlogByTag"))
app.get("/queryBlogCountByTagId", loader.pathMap.get("/queryBlogCountByTagId"))
app.listen(config.globalConfig.port, () => {
    console.log("服务已启动" + config.globalConfig.port)
})