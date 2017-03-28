/**
 * Created by liuyang on 2017/3/28.
 */

$(function () {
    //get all passed service
    getAllPassedService();
});

function getAllPassedService() {
    $.ajax({
        url: "/intelshare/controller/service.con.php",
        data: "funName=getPassedService",
        success: function (data) {
            var result = JSON.parse(data);
            var num = result.serviceNum;

            if (num == 0) {
                $("#service-list").html("<p>暂时没有任何企业入驻</p>")
            } else {
                var html = "";
                for (var item in result.serviceInfo) {
                    html += "<div class='col-lg-6 col-md-6 col-sm-6'>" +
                        "<div class='media panel mdl-shadow--2dp'>" +
                        "<div class='media-left'>" +
                        "<a href='#'>" +
                        "<img class='media-object' src='../images/upgrade/product.svg'>" +
                        "</a>" +
                        "</div>" +
                        "<div class='media-body'>" +
                        "<h5 class='media-heading'>" +
                        "<a href='#'>" + result.serviceInfo[item + ""]['company_name'] + "</a>" +
                        "</h5>" +
                        "<p style='text-overflow:ellipsis;'>" +
                        "<small>" + result.serviceInfo[item + ""]['service_description'].substring(0, 30) + "...</small>" +
                        "</p>" +

                        "<span class='label label-info'>type / label / tag</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                }

                $("#service-list").html(html).fadeIn(700);
            }
        }
    })
}

function submitApply() {
    //check apply form
    //if passed

    var serializedData = $("#service-apply-form").serialize();

    $.ajax({
        url: "/intelshare/controller/service.con.php",
        type: "get",
        data: serializedData + "&funName=addServiceApply",
        success: function (data) {
            var result = JSON.parse(data);

            $("#serviceApplyModal").modal('hide');
            if (result.status != CORRECT) {
                swal(errorCode2errorInfo(result.status));
            } else {
                swal("已提交申请，工作人员将会与您联系")
            }
        }
    })
}

/*

 <div class="col-lg-6 col-md-6 col-sm-6">
 <div class="media panel mdl-shadow--2dp">
 <div class="media-left">
 <a href="#">
 <img class="media-object" src="../images/upgrade/product.svg" alt="...">
 </a>
 </div>
 <div class="media-body">
 <h5 class="media-heading">
 <a href="#">Title</a>
 </h5>
 <p>
 <small>description.......</small>
 </p>

 <span class="label label-primary">type / label / tag</span>
 </div>
 </div>
 </div>

 */