/**
 * Created by liuyang on 2017/4/12.
 */

var numPerPage = 4;
var pageNum = 1;
var cp = getQueryString("p");

if (cp == null || cp.toString().length < 1) {
    cp = 1;
}

$(document).ready(function () {
    getNews();
});

function getNews() {
    $.ajax({
        url: "/intelshare/controller/news.con.php",
        data: {funName: "getNews", cp: cp},
        type: "get",
        success: function (data) {
            var result = JSON.parse(data);
            var num = result.newsNum;
            console.log(result);

            if (num == 0) {
                $("#news-list").html("<p>暂时没有资讯</p>")
            } else {
                var html = "";
                var i = 0;
                for (var item in result.news) {

                    var src = "../images/upgrade/default.png";
                    if (result.news[item + ""]["image"] != null && result.news[item + ""]["image"] != "") {
                        src = "../../Admin/images/news/" + result.news[item + ""]['image'];
                    }

                    html += "<div class='blog-inner'>" +
                        "<div class='image' style='background-image: url(" + src + ");'></div>" +
                        "<div class='desc desc2'>" +
                        "<h3>" + result.news[item + ""]['title'] + "</h3>" +
                        "<p>" + result.news[item + ""]['content'].substring(0, 50) + "</p>" +
                        "<p><a href='new.html?i=" + item + "' class='btn btn-primary btn-luxe-primary'>Learn More</a></p>" +
                        "</div></div>";
                    i++;
                    if (i == 2) {
                        $("#news-list-1").html(html);
                        html = "";
                    }

                    if (i == 4) {
                        $("#news-list-2").html(html);
                        html = "";
                    }
                }
                if (i > 2 && html != "") {
                    $("#news-list-2").html(html);
                    html = "";
                } else if (i <= 2 && html != "") {
                    $("#news-list-1").html(html);
                    html = "";
                }
            }

            // set pagenation
            if (num > 0) {
                pageNum = Math.ceil(num / numPerPage);
            }
            if (cp == 1) {
                $("ul.pagination li:first").attr("class", "disabled");
            }

            if (cp == pageNum) {
                $("ul.pagination li:last").attr("class", "disabled");
            }

            for (var i = 1; i <= pageNum; i++) {

                if (i == cp) {
                    $("ul.pagination li:eq(-2)").after(
                        "<li class='active' onclick='goPage(" + i + ")'><a>" + i + "</a></li>"
                    );
                } else {
                    $("ul.pagination li:eq(-2)").after(
                        "<li onclick='goPage(" + i + ")'><a>" + i + "</a></li>"
                    );
                }

            }
        }
    })
}

function goPage(page) {
    if (page != cp)
        location.href = "zixun.html?p=" + page;
}

function prevPage() {
    var page = Math.max(cp - 1, 1);
    if (page != cp)
        location.href = "zixun.html?p=" + page;
}

function nextPage() {
    var page = Math.min(pageNum, cp + 1);
    if (page != cp)
        location.href = "zixun.html?p=" + page;
}

/*

 <div class="feature-full-2col">
 <div class="blog-inner">
 <div class="image" style="background-image: url(../images/project-1.jpg);">
 </div>
 <div class="desc desc2">
 <h3>#资讯# title1</h3>
 <p></p>
 <p><a href="#" class="btn btn-primary btn-luxe-primary">Learn More</a></p>
 </div>
 </div>
 <div class="blog-inner">
 <div class="image" style="background-image: url(../images/project-2.jpg);">
 </div>
 <div class="desc desc2">
 <h3>#人物# title2</h3>
 <p>Pellentesque habitant morbi tristique senectus et netus ett mauada fames ac turpis
 egestas. Etiam euismod tempor leo, in suscipit urna condimentum sed. </p>
 <p><a href="#" class="btn btn-primary btn-luxe-primary">Learn More</a></p>
 </div>
 </div>
 </div>

 */