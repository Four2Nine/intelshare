/**
 * Created by liuyang on 2017/4/12.
 */

var id = getQueryString("i");

if (id == null || id.toString().length < 1) {
    location.href = "zhihui.html"
}

$.ajax({
    url: "/intelshare/controller/service.con.php",
    type: "get",
    data: {i: id, funName: "getServiceDetail"},
    success: function (data) {
        var result = JSON.parse(data);

        console.log(result);
        var logo = result['detail']['company_logo'];
        var company_name = result['detail']['company_name'];
        var url = result['detail']['company_website'];
        var company_desc = result['detail']['service_description'];
        var view_count = result['detail']['view_count'];
        var service_type = result['detail']['service_type'];
        var city = result['detail']['service_city'];
        var industry = result['detail']['industry'];
        var price = result['detail']['service_price'];

        var banner_image = result['detail']['banner_image'];
        var banner_text = result['detail']['banner_text'];
        var detail_image = result['detail']['service_detail_image'];
        var additional = result['detail']['additional'];

        if (logo != null && logo != "") {
            $("#company_logo").prop("src", "../../Admin/images/service/" + logo);
        }

        $("#company_name").html(company_name);
        $("#company_desc").html(company_desc.substring(0, 20));
        $("#view_count").html(view_count);
        $("#company_website").prop("href", url);

        if (service_type != null && service_type != "") {
            $("#service_type").html(service_type);
        } else {
            $("#service_type").html("无");
        }

        if (banner_image != null && banner_image != "") {
            $("#banner_image").prop("src", "../../Admin/images/service/" + banner_image);
        } else {
            $("#banner_image").hide();
        }
        if (banner_text != null && banner_text != "") {
            $("#banner_text").html(banner_text);
        }
        if (detail_image != null && detail_image != "") {
            $("#detail_image").prop("src", "../../Admin/images/service/" + detail_image);
        } else {
            $("#detail_image").hide();
        }

        if (additional != null && additional != "") {
            $("#additional").html(additional);
        } else {
            $("#additional").html("无");
        }

        if (city != null && city != "") {
            $("#city").html("服务城市: " + city);
        }
        if (industry != null && industry != "") {
            $("#industry").html("产业类型: " + industry);
        }
        if (price < 0) {
            $("#price").html("价格面议");
        } else {
            $("#price").html("价格: " + price + " 元");
        }

    }
});