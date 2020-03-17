var nav = new Vue({
    el: "#nav",
    data: {
        link: {
            home: "/",
            sitemap: "./sitemap.html",
            about: "./about.html",
            guestbook: "./guestbook.html"
        }
    }
})
var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: []
    },
    computed: {
        randomColor() {
            return function() {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return `rgb(${red},${green},${blue})`
            }
        },
        randomSize() {
            return function() {
                var size = Math.random() * 20 + 12 + "px"
                return size
            }
        },
    },
    created() {
        axios({
            method: "get",
            url: "/queryRandomTags?size=4"
        }).then((resp) => {
            for (var i = 0; i < resp.data.data.length; i++) {
                var obj = {}
                obj.tag = resp.data.data[i].tag
                obj.tagLink = `/?tag=${resp.data.data[i].tag}`
                this.tags.push(obj)
            }
        }).catch((resp) => { console.log(resp) })
    }
})
var hotArticle = new Vue({
    el: "#hot_article",
    data: {
        articleList: []
    },
    created() {
        axios({
            method: "get",
            url: "/queryHotBlogByView?size=6"
        }).then((resp) => {
            var data = [].slice.call(resp.data.data);
            for (var i = 0; i < data.length; i++) {
                data[i].link = `blog_article_detall.html?id=${data[i].id}`
                this.articleList.push(data[i])
            }
            // this.articleList = data

            console.log(this.articleList)
        }).catch((resp) => {
            console.log(resp)
        })
    }
})
var newComments = new Vue({
    el: "#new_comment",
    data: {
        commentList: []
    },
    created() {
        axios({
            method: "get",
            url: "queryNewComments?size=10"
        }).then((resp) => {
            var data = resp.data.data
            for (var i = 0; i < data.length; i++) {
                this.commentList.push({
                    name: data[i].user_name,
                    date: data[i].ctime,
                    comment: data[i].comments
                })

            }
        }).catch((resp) => {
            console.log(resp)
        })
    }
})