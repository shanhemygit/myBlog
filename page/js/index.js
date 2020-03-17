var everyDay = new Vue({
    el: "#every_day",
    data: {
        content: "hello word"
    },
    computed: {
        getContent() {
            return this.content;
        }

    },
    created() {
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(function(resp) {
            everyDay.content = resp.data.data[0].content
        }).catch(function(resp) {
            console.log("请求失败")
        })
    }
})

var articleList = new Vue({
    el: "#article",
    data: {
        btn_prev: false,
        btn_next: false,
        current_page: 1, //当前所在页面
        total_article: 100,
        btn_list: [],
        pageSize: 5,
        total_page: 50, //总页数
        btn_numb_max: 6, //最大按钮数量
        article_list: []
    },
    methods: {
        jumpTo(current) {
            this.btn_next = true;
            this.btn_prev = true
            if (current == "next" && this.current_page < this.total_page) {
                this.current_page++;
                this.page_tool
            }
            if (current == "prev" && this.current_page > 1) {
                this.current_page--;
                this.page_tool
            }
            if (current != this.current_page && !isNaN(current)) {
                this.current_page = current;
                this.page_tool
            }
            if (this.current_page == 1) {
                this.btn_prev = false
            }
            if (this.current_page == this.total_page) {
                this.btn_next = false
            }
            this.getPage(this.current_page, this.pageSize)
                // axios({
                //     method: "get",
                //     url: `/queryArticle?page=${this.current_page-1}&pageSize=${this.pageSize}`
                // }).then((resp) => {
                //     this.article_list = [].slice.call(resp.data.data)
                // }).catch(function(resp) {
                //     console.log(resp)
                // });

        }
    },
    computed: {
        page_tool() {
            if (this.btn_numb_max % 2 == 0) { //判断按钮奇偶性
                //为偶数时
                if (this.total_page > this.btn_numb_max) { //当页面数大于按钮显示数量时
                    if (this.current_page >= Math.floor(this.btn_numb_max / 2) + 1 && this.current_page <= this.total_page - Math.floor(this.btn_numb_max / 2) - 1) {
                        var start = this.current_page - Math.floor(this.btn_numb_max / 2) + 1;
                        var end = this.current_page + Math.floor(this.btn_numb_max / 2) - 1
                        this.btn_info_render(start, end, this.current);
                    }
                    if (this.current_page < Math.floor(this.btn_numb_max / 2) + 1) {
                        var start = 1;
                        var end = this.btn_numb_max;
                        this.btn_info_render(start, end, this.current);
                    }
                    if (this.current_page > this.total_page - Math.floor(this.btn_numb_max / 2) - 1) {
                        var start = this.current - Math.floor(this.btn_numb_max / 2);
                        var end = this.total_page;
                        this.btn_info_render(start, end, this.current);
                    }
                } else { //当页面数量小于或等于按钮显示数量时
                    var start = 1;
                    var end = this.total_page;
                    this.btn_info_render(start, end, this.current);

                }

            } else {

            }
            if (this.current_page < this.total_page) {
                this.btn_next = true
            }
        },
        btn_info_render() {

            return (start, end, curent) => {
                this.btn_list = [];
                for (var i = start; i <= end; i++) {
                    var btn_info = {}
                    btn_info.text = i;
                    btn_info.flag = i == this.current_page ? true : false;
                    this.btn_list.push(btn_info);

                }
            }
        },
        getPage() {
            return (page, pageSize) => {
                var SearchUrl = location.search.indexOf("?") > -1 ? location.search.replace(/\?/, "").split("&") : "";
                var tag = "";
                if (SearchUrl != "") {
                    for (var i = 0; i < SearchUrl.length; i++) {
                        if (SearchUrl[i].split("=")[0] == "tag") {
                            tag = SearchUrl[i].split("=")[1]
                        }
                    }
                }
                if (tag == "" || tag == null) {
                    axios({
                        method: "get",
                        url: `/queryArticle?page=${page-1}&pageSize=${pageSize}`
                    }).then((resp) => {
                        // console.log(new Date(resp.data.data[0].ctime * 1000))
                        var temp = [].slice.call(resp.data.data)
                        temp.forEach(function(ele, index) {
                            ele.link = `./blog_article_detall.html?id=${temp[index].id}`
                        })
                        this.article_list = temp
                    }).catch(function(resp) {
                        console.log(resp)
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogCount"
                    }).then((resp) => {

                        var articleCount = resp.data.data[0]['count(id)']
                        this.total_article = articleCount;
                        this.total_page = Math.ceil(articleCount / this.pageSize);
                        articleList.page_tool

                    }).catch((resp) => {
                        console.log(resp)
                    })
                } else {
                    axios({
                        method: "get",
                        url: `queryBlogByTag?tag=${tag}&page=${page-1}&pageSize=${pageSize}`
                    }).then((resp) => {
                        var temp = [].slice.call(resp.data.data)
                        temp.forEach(function(ele, index) {
                            ele.link = `./blog_article_detall.html?id=${temp[index].id}`
                        })
                        this.article_list = temp
                    }).catch((resp) => {
                        console.log(resp)
                    })
                    axios({
                        method: "get",
                        url: `/queryBlogCountByTagId?tag=${tag}`
                    }).then((resp) => {

                        var articleCount = resp.data.data[0]['count(tag_id)']
                        this.total_article = articleCount;
                        this.total_page = Math.ceil(articleCount / this.pageSize);
                        articleList.page_tool

                    }).catch((resp) => {
                        console.log(resp)
                    })
                }


            }
        }
    },
    created() {
        this.getPage(this.current_page, this.pageSize)

    }
})