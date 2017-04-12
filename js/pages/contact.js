/**
 * Created by liuyang on 2017/4/12.
 */

$.ajax({
    url: "/intelshare/controller/contact.list.con.php",
    success: function (data) {
        var result = JSON.parse(data);
        var html = "";
        console.log(result);

        for (var item in result.staff) {
            var src = "../images/upgrade/product.svg";
            if (result.staff[item + ""]["image"] != null) {
                src = "../../Admin/images/staff/" + result.staff[item + ""]['image'];
            }
            html += "<a class='portfolio-grid-item' style='background-image: url(" + src + ")'>" +
                "<div class='desc2'><h3>" + result.staff[item + ""]["name"] + "</h3>" +
                "<span>" + result.staff[item + ""]["duties"] + "</span></div></a>";
        }

        $("#contact-item").after(html);
    }
});

/*

 <a href="#" class="portfolio-grid-item" style="background-image: url(../images/project-5.jpg);">
 <div class="desc2">
 <h3>姓名</h3>
 <span>职位</span>
 <i class="sl-icon-heart"></i>
 </div>
 </a>

 */