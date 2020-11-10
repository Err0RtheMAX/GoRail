// JavaScript Document
let request = require('request');
let cheerio = require('cheerio');
// 사전에 cmd 창에서 npm install request --save,
// npm install cheerio --save을 입력하여 패키지 설치해야 구동이 됨.

const $url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getCtyCodeList'
// 도, 특별시 코드번호 조회할 수 있는 open api url 주소

const $KEY = 'QLurjCdtJG0va%2BqBL78fNW8omrqpekw6IbOP5qa%2B1mQHG67kMOXgB53ssFbJdHV%2FvBDKl4WVSoKzuJySn02CIw%3D%3D'
// 미리 받은 인증 키

const  $api_url = $url + '?serviceKey=' + $KEY;

console.log($api_url);

request($api_url, function(err, res, body) {
	$ = cheerio.load(body);
	
	$('item').each(function(idx){
	// xml 코드에서 item 태그 안에 citycode와 cityname 구분하여 변수 지정하기
    let citycode = $(this).find('citycode').text();
	let cityname = $(this).find('cityname').text();
	
	
	console.log(`도시ID : ${citycode}, 도시 : ${cityname}`);
	});
});
