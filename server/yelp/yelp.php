<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
/**
 * Yelp API v2.0 code sample.
 *
 * This program demonstrates the capability of the Yelp API version 2.0
 * by using the Search API to query for businesses by a search term and location,
 * and the Business API to query additional information about the top result
 * from the search query.
 *
 * Please refer to http://www.yelp.com/developers/documentation for the API documentation.
 *
 * This program requires a PHP OAuth2 library, which is included in this branch and can be
 * found here:
 *      http://oauth.googlecode.com/svn/code/php/
 *
 * Sample usage of the program:
 * `php sample.php --term="bars" --location="San Francisco, CA"`
 */


//Fetch the OAuth Library that will be used to create our oauth token
require_once('lib/OAuth.php');
//Grab API Credentials
require_once('config.php');


$host='api.yelp.com';
$path='/v2/search/';
$default_term='beer'; //yelp requires a default term and location
$default_location='Irvine, Ca';

$contents = file_get_contents("php://input");
$contents = utf8_encode($contents);
//create associative array with the client side data needed to make yelp call
$yelp_terms = json_decode($contents, true);
//var_dump($yelp_terms);

query_yelp($yelp_terms);

function query_yelp($yelp_terms){
    $response = json_decode(check_search($yelp_terms));
    $response =json_encode($response);
//    var_dump($response);
    print_r($response);
}

function check_search($yelp_terms){
    $params = $yelp_terms;
    //make sure the parms have key values
    foreach ($params as $external => $internal) {
        if($external === "term" && empty($params[$external])){
            echo('in if');
            $params[$external] = $GLOBALS['default_term'];
        }elseif ($external === "location" && empty($params[$external])){
            echo 'in the elseif';
            $params[$external] = $GLOBALS['default_location'];
        }
    }
    $search_query = $GLOBALS['path'] ."?". http_build_query($params);
//    print_r($search_query);
    return request_yelp($GLOBALS['host'], $search_query);

}

function request_yelp($host, $search){
    $url = "http://" .$host . $search;
    //build token from OAuth library
    $token  = new OAuthToken($GLOBALS['TOKEN'], $GLOBALS['TOKEN_SECRET']);

    //build client credential token
    $consumer = new OAuthConsumer($GLOBALS['CONSUMER_KEY'], $GLOBALS['CONSUMER_SECRET']);

    //Encrypt it!
    $signature_method = new OAuthSignatureMethod_HMAC_SHA1();

    $oauthrequest = OAuthRequest::from_consumer_and_token(
        $consumer,
        $token,
        'GET',
        $url
    );

    //sign the request
    $oauthrequest->sign_request($signature_method, $consumer, $token);

    $signed_url = $oauthrequest->to_url();
    //initiate API call to Yelp
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $signed_url);
    $data = curl_exec($ch);

    curl_close($ch);
//    var_dump($data);

//    try{
//        $ch = curl_init($signed_url);
//        if(FALSE === $ch) {
//            throw new Exception("Failed to initialize");
//        }
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        curl_setopt($ch, CURLOPT_HEADER, 0);
//        $data = curl_exec($ch);
//
//        if(FALSE === $data){
//            throw new Exception(curl_error($ch), curl_errno($ch));
//        }
//        $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
//        if(200 != $http_status){
//            throw new Exception($data, $http_status);
//        }
//        curl_close($ch);
//        var_dump($data);
//    }catch(Exception $e){
//        trigger_error(sprintf(
//            "Curl failed with error #%d: %s",
//            $e->getCode(), $e->getMessage()),
//            E_USER_ERROR);
//    }
    return $data;


}

//query_yelp($yelp_terms);


?>