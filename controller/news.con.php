<?php
/**
 * 获资讯列表
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
    case 'getNews':
        getNews(((int)$_GET['cp'] - 1) * 4, 4);
        break;
    case 'addServiceApply':
        addServiceApply();
        break;
    case 'addServiceRequest':
        addServiceRequest();
        break;
    case 'getServiceDetail':
        getServiceDetail((int)$_GET['i']);
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

function PDOConnect()
{
    $con = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD);
    $con->query("SET NAMES UTF8;");
    return $con;
}

function getNews($s, $n)
{
    $con = connect();

    $result = array();
    $sql = "SELECT 
                  `id`, 
                  `title`, 
                  `content`, 
                  `image_path`
            FROM `tb_news` 
            ORDER BY `publish_time` DESC 
            LIMIT ?, ?";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("ii", $s, $n);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result(
        $id,
        $title,
        $content,
        $image_path
    );

    $result['news'] = array();

    while ($stmt->fetch()) {
        $item = array();
        $item['id'] = $id;
        $item['title'] = $title;
        $item['content'] = $content;
        $item['image'] = $image_path;

        $result['news'][$id] = $item;
    }

    //获取数量
    $sqlCount = "SELECT * FROM `tb_news`";
    $stmt = $con->prepare($sqlCount);
    $stmt->execute();
    $stmt->store_result();
    $result['newsNum'] = $stmt->num_rows;

    //关闭数据库连接
    $stmt->close();
    $con->close();
    echo json_encode($result);
}

function getServiceDetail($i)
{
    $con = PDOConnect();

    $sql = "UPDATE `tb_service` SET `view_count` = `view_count` + 1 WHERE `id` = ?";
    $stmt = $con->prepare($sql);

    $stmt->bindParam(1, $i, PDO::PARAM_INT);
    $stmt->execute();

    //----------------------

    $sql = "SELECT * FROM `tb_service` WHERE `id` = ?";
    $stmt = $con->prepare($sql);

    $stmt->bindParam(1, $i, PDO::PARAM_INT);
    $stmt->execute();

    $result = array();
    $result['detail'] = $stmt->fetchObject();

    echo json_encode($result);
    exit;
}