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
                        "<a href='xiangqing.html'>" +
                        "<img class='media-object' src='../images/upgrade/product.svg'>" +
                        "</a>" +
                        "</div>" +
                        "<div class='media-body'>" +
                        "<h5 class='media-heading'>" +
                        "<a href='xiangqing.html'>" + result.serviceInfo[item + ""]['company_name'] + "</a>" +
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

    var name = $("#company-name");
    var url = $("#company-website");
    var contact = $("#contact-name");
    var phone = $("#contact-phone-number");
    var email = $("#contact-email");
    var description = $("#service-desc");

    if (name.val() == "") {
        $("#company-name-error").html("不能为空");
        return false;
    } else {
        $("#company-name-error").html("");
    }
    if (url.val() == "") {
        $("#company-website-error").html("不能为空");
        return false;
    } else {
        $("#company-website-error").html("");
    }
    if (contact.val() == "") {
        $("#contact-name-error").html("不能为空");
        return false;
    } else {
        $("#contact-name-error").html("");
    }
    if (phone.val() == "") {
        $("#contact-phone-number-error").html("不能为空");
        return false;
    } else {
        $("#contact-phone-number-error").html("请如实填写，否则我们将无法联系到您");
    }
    if (email.val() == "") {
        $("#contact-email-error").html("不能为空");
        return false;
    } else {
        $("#contact-email-error").html("请如实填写，否则我们将无法联系到您");
    }
    if (description.val() == "") {
        $("#service-desc-error").html("不能为空");
        return false;
    } else {
        $("#service-desc-error").html("");
    }

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

function submitRequest() {
    var serializedData = $("#service-request-form").serialize();

    var name = $("#company-name-req");
    var scale = $("#scale");
    var industry = $("#industry");
    var city = $("#city");
    var serviceType = $("#service-type");
    var budget = $("#budget");

    if (name.val() == "") {
        $("#company-name-req-error").html("不能为空");
        return false;
    } else {
        $("#company-name-req-error").html("");
    }

    if (industry.val() == "") {
        $("#industry-error").html("不能为空");
        return false;
    } else {
        $("#industry-error").html("");
    }

    if (city.val() == "") {
        $("#city-error").html("不能为空");
        return false;
    } else {
        $("#city-error").html("");
    }

    if (serviceType.val() == "") {
        $("#service-type-error").html("不能为空");
        return false;
    } else {
        $("#service-type-error").html("");
    }

    if (budget.val() == "") {
        $("#budget-error").html("不能为空");
        return false;
    } else if (budget.val() < 0) {
        $("#budget-error").html("预算不能为负数")
        return false;
    } else {
        $("#budget-error").html("");
    }

    $.ajax({
        url: "/intelshare/controller/service.con.php",
        type: "get",
        data: serializedData + "&funName=addServiceRequest",
        success: function (data) {
            var result = JSON.parse(data);

            $("#serviceRequestModal").modal('hide');
            if (result.status != CORRECT) {
                swal(errorCode2errorInfo(result.status));
            } else {
                swal("已提交需求")
            }
        }
    })
}

/*



 */