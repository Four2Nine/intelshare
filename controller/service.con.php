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
        getPassedService(((int)$_GET['cp'] - 1) * 6, 6);
        break;
    case 'addServiceApply':
        addServiceApply();
        break;
    case 'addServiceRequest':
        addServiceRequest();
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

function getPassedService($s, $n)
{
    $con = connect();

    $result = array();
    $sql = "SELECT 
                  `id`, 
                  `company_logo`, 
                  `company_name`, 
                  `service_type`,
                  `industry`,
                  `apply_time`, 
                  `service_description` 
            FROM `tb_service` 
            WHERE `is_pass`=1 
            ORDER BY `apply_time` DESC 
            LIMIT ?, ?";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("ii", $s, $n);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result(
        $id,
        $company_logo,
        $company_name,
        $type,
        $industry,
        $apply_time,
        $service_desc
    );

    $result['serviceInfo'] = array();

    while ($stmt->fetch()) {
        $item = array();
        $item['id'] = $id;
        $item['company_logo'] = $company_logo;
        $item['company_name'] = $company_name;
        $item['type'] = $type;
        $item['industry'] = $industry;
        $item['apply_time'] = $apply_time;
        $item['service_description'] = $service_desc;

        $result['serviceInfo'][$id] = $item;
    }

    //获取项目数量
    $sqlCount = "SELECT * FROM `tb_service` WHERE `is_pass` = 1";
    $stmt = $con->prepare($sqlCount);
    $stmt->execute();
    $stmt->store_result();
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

function addServiceRequest()
{
    $company_name = $_GET['company-name'];
    $scale = $_GET['scale'];
    $industry = $_GET['industry'];
    $city = $_GET['city'];
    $serviceType = $_GET['service-type'];
    $budget = $_GET["budget"];

    $con = connect();

    $sql = "INSERT INTO `tb_request` (
                    `company_name`,
                    `scale`,
                    `industry`,
                    `city`,
                    `service_type`,
                    `budget`
              ) VALUE (?, ?, ?, ?, ?, ?)";

    $stmt = $con->prepare($sql);
    $stmt->bind_param(
        "sisssi",
        $company_name,
        $scale,
        $industry,
        $city,
        $serviceType,
        $budget
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