<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$contents = file_get_contents("php://input");

$contents = utf8_encode($contents);
$results = json_decode($contents, true);

$api_key = $results['key'];
$beer = $results['name'];

$params = array("key"=>$api_key, "name"=>$beer);

$unsigned_url = $results['url'];


//build url
$url = $unsigned_url ."?". http_build_query($params);

//get curl resource
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_URL, $url);

$data = curl_exec($ch);
curl_close($ch);
$data = json_decode($data, true);

$food = $data['data'];
$food = json_encode($food);

print_r($food);
?>