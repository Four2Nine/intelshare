<?php
/**
 * 获取企业服务列表
 *
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2017/03/26
 * Time: 12:11
 */

require 'connection.db.php';
require 'Constant.php';


$funName = filter_input(INPUT_GET, 'funName');

switch ($funName) {
    case 'getPassedService':
        getPassedService();
        break;
    case 'addServiceApply':
        addServiceApply();
        break;
    default:
        echo json_encode(array());
}


function connect()
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    return $con;
}

function getPassedService()
{
    $con = connect();

    $result = array();
    $sql = "SELECT `id`, `company_name`, `contact_name`, `contact_phone_number`, `contact_email`, 
`apply_time`, `service_description` FROM `tb_service` WHERE `is_pass`=1 ORDER BY `apply_time` DESC";

    $stmt = $con->prepare($sql);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result(
        $id,
        $company_name,
        $contact_name,
        $phone_number,
        $email,
        $apply_time,
        $service_desc
    );

    $result['serviceInfo'] = array();

    while ($stmt->fetch()) {
        $item = array();
        $item['id'] = $id;
        $item['company_name'] = $company_name;
        $item['contact_name'] = $contact_name;
        $item['phone_number'] = $phone_number;
        $item['email'] = $email;
        $item['apply_time'] = $apply_time;
        $item['service_description'] = $service_desc;

        $result['serviceInfo'][$id] = $item;
    }

    $result['serviceNum'] = $stmt->num_rows;

    //关闭数据库连接
    $stmt->close();
    $con->close();
    echo json_encode($result);
}

function addServiceApply()
{
    $company_name = $_GET['company-name'];
    $company_website = $_GET['company-website'];
    $contact_name = $_GET['contact-name'];
    $phone = $_GET['contact-phone-number'];
    $email = $_GET['contact-email'];
    $service_desc = $_GET['service-desc'];

    $con = connect();

    $sql = "INSERT INTO `tb_service` (
                    `company_name`,
                    `company_website`,
                    `contact_name`,
                    `contact_phone_number`,
                    `contact_email`,
                    `service_description`
              ) VALUE (?, ?, ?, ?, ?, ?)";

    $stmt = $con->prepare($sql);
    $stmt->bind_param(
        "ssssss",
        $company_name,
        $company_website,
        $contact_name,
        $phone,
        $email,
        $service_desc
    );
    $stmt->execute();

    $result = array();

    $affected_rows = $stmt->affected_rows;

    if ($affected_rows == 1) {
        $result['status'] = Constant::$_CORRECT;
    } else {
        $result['status'] = Constant::$_DB_INSERT_ERROR;
    }

    //关闭数据库连接
    $stmt->close();
    $con->close();
    echo json_encode($result);
}