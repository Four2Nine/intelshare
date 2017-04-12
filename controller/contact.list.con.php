<?php
/**
 * 获取全球合伙人列表
 *
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2017/03/26
 * Time: 12:11
 */

require 'connection.db.php';
require 'Constant.php';

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$result = array();
$sql = "SELECT `id`, `image`, `name`, `description`, `duties` FROM `tb_staff` WHERE `is_top`=1 ORDER BY `create_time` DESC LIMIT 0, 4";

$stmt = $con->prepare($sql);
//$stmt->bind_param("i", $n);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result(
    $id,
    $image,
    $name,
    $description,
    $duties
);

$result['staff'] = array();

while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['image'] = $image;
    $item['name'] = $name;
    $item['desc'] = $description;
    $item['duties'] = $duties;

    $result['staff'][$id] = $item;
}

//关闭数据库连接
$stmt->close();
$con->close();
echo json_encode($result);
