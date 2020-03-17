// var hotArticle = new Vue({
//     el: "#hot_article",
//     data: {
//         articleList: [
//             { title: "hahahha", link: "https://www.baidu.com" },
//             { title: "hahahha", link: "https://www.baidu.com" },
//             { title: "hahahha", link: "https://www.baidu.com" },
//             { title: "hahahha", link: "https://www.baidu.com" },
//             { title: "hahahha", link: "https://www.baidu.com" },
//             { title: "hahahha", link: "https://www.baidu.com" },
//             { title: "hahahha", link: "https://www.baidu.com" },
//             { title: "hahahha", link: "https://www.baidu.com" },

//         ]
//     }
// })

// var newComments = new Vue({
//     el: "#new_comment",
//     data: {
//         commentList: [{
//                 name: "用户名",
//                 date: "2020-01-01",
//                 comment: "这里是评论"
//             },
//             {
//                 name: "用户名",
//                 date: "2020-01-01",
//                 comment: "这里是评论"
//             }, {
//                 name: "用户名",
//                 date: "2020-01-01",
//                 comment: "这里是评论"
//             },
//             {
//                 name: "用户名",
//                 date: "2020-01-01",
//                 comment: "这里是评论"
//             }, {
//                 name: "用户名",
//                 date: "2020-01-01",
//                 comment: "这里是评论"
//             },
//             {
//                 name: "用户名",
//                 date: "2020-01-01",
//                 comment: "这里是评论"
//             }, {
//                 name: "用户名",
//                 date: "2020-01-01",
//                 comment: "这里是评论"
//             },
//             {
//                 name: "用户名",
//                 date: "2020-01-01",
//                 comment: "这里是评论"
//             }, {
//                 name: "用户名",
//                 date: "2020-01-01",
//                 comment: "这里是评论"
//             },
//             {
//                 name: "用户名",
//                 date: "2020-01-01",
//                 comment: "这里是评论"
//             }
//         ]
//     }
// })

var article_detall = new Vue({
    el: "#detall",
    data: {
        article_detall: {},

    },
    methods: {
        addview() {
            var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.replace(/\?/, "").split("&") : "";
            var id = ""
            for (var i = 0; i < searchUrlParams.length; i++) {
                if (searchUrlParams[i].split("=")[0] == "id") {
                    id = searchUrlParams[i].split("=")[1];
                    break;
                }
            }
            axios({
                method: "get",
                url: `/addView?id=${id}`
            }).then((resp) => {

            }).catch((resp) => {
                console.log(resp)
            })
        }
    },
    created() {
        this.addview()
        var search = location.search.replace(/\?/, "").split("&");
        var id = null;
        for (var i = 0; i < search.length; i++) {
            if (search[i].split("=")[0].trim() == "id") {
                id = search[i].split("=")[1];
            } else {
                continue;
            }
        }
        if (id == "" || id == null) {
            return
        }
        axios({
            method: "get",
            url: `/queryBlogArticleById?id=${parseInt(id)}`
        }).then((resp) => {
            this.article_detall = resp.data.data[0]
        }).catch((resp) => {
            console.log(resp)
        })
    }
})
var blog_comments = new Vue({
    el: "#blog_comments",
    data: {
        commentList: ""
    },
    methods: {
        reply(parentId, parentName) {
            console.log(parentId, parentName)
            document.getElementById("comment_reply").value = parentId
            document.getElementById("comment_reply_name").value = parentName
            location.href = "#send_comment"
        }
    },
    commputed: {

    },
    created() {

        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.replace(/\?/, "").split("&") : "";
        var id = ""
        for (var i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == "id") {
                id = searchUrlParams[i].split("=")[1];
                break;
            }
        }
        if (id != "" || id != null) {
            axios({
                method: "get",
                url: `/queryCommentByBlogId?id=${parseInt(id)}`
            }).then((resp) => {

                var data = resp.data.data
                for (var i = 0; i < data.length; i++) {
                    if (data[i].parent > -1) {
                        data[i].opations = ` 回复 ${data[i].parent_name}`
                    } else {
                        data[i].opations = null
                    }
                }
                this.commentList = data
            }).catch((resp) => {
                console.log(resp)
            })
        }
    },

})
var commentSend = new Vue({
    el: "#send_comment",
    data: {
        code: "",
        svgCode: ""
    },
    methods: {
        submitTo() {
            var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.replace(/\?/, "").split("&") : ""
            var bid = -1;
            if (searchUrlParams) {
                for (var i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "id") {
                        bid = searchUrlParams[i].split("=")[1]
                    }
                }
            } else {
                return
            }
            var reply = document.getElementById("comment_reply").value
            var replyName = document.getElementById("comment_reply_name").value
            var nickname = document.getElementById("comment_nickname").value
            var email = document.getElementById("comment_email").value
            var content = document.getElementById("comment_content").value
            var code = document.getElementById("comment_code").value;
            if (this.code.toLowerCase() == code) {
                axios({
                    method: "get",
                    url: `/addComment?bid=${bid}&reply=${reply}&replyName=${replyName}&nickname=${nickname}&email=${email}&content=${content}`
                }).then((resp) => {
                    alert(resp.data.msg)
                }).catch((resp) => {
                    console.log(resp)
                })
            } else {
                alert("验证码错误")
                return
            }


        },
        updataCode() {
            axios({
                method: "post",
                url: "/randomCode"
            }).then((resp) => {

                this.svgCode = resp.data.data.data
                this.code = resp.data.data.text
            }).catch((resp) => {
                console.log(resp)
            })
        }
    },
    created() {

        this.updataCode()

    }
})