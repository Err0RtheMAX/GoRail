// JavaScript Document
let request = require('request');
let cheerio = require('cheerio');
// 사전에 cmd 창에서 npm install request --save,
// npm install cheerio --save을 입력하여 패키지 설치해야 구동이 됨.

const $url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getCtyAcctoTrainSttnList'
// 역 ID를 조회할 수 있는 open api url 주소

const $KEY = 'QLurjCdtJG0va%2BqBL78fNW8omrqpekw6IbOP5qa%2B1mQHG67kMOXgB53ssFbJdHV%2FvBDKl4WVSoKzuJySn02CIw%3D%3D'
// 미리 받은 인증 키

const $numOfRows = '1000';
// 한 페이지에 나올 결과 수를 1000개씩 출력되게 설정

const $pageNo = '1';
// 출력되는 페이지 첫번째 페이지로 출력하게 하기

var cityput = 0;

const $cityCode = '32';
// 여기에 도시ID코드조회.js 를 참고하여 조회하고자 하는 도시의 ID코드 입력하기
// 서울 - 11, 세종 - 12, 부산 - 21, 대구 - 22, 인천 - 23, 광주 - 24, 대전 - 25, 울산 - 26, 경기 - 31, 강원 - 32
// 충북 - 33, 충남 - 34, 전북 - 35, 전남 - 36, 경북 - 37, 경남 - 38

const  $api_url = $url + '?serviceKey=' + $KEY + '&numOfRows=' + $numOfRows + '&pageNo=' + $pageNo + '&cityCode=' + $cityCode;

console.log($api_url);

request($api_url, function(err, res, body) {
	$ = cheerio.load(body);
	
	$('item').each(function(idx){
	// xml 코드에서 item 태그 안에 nodeid와 nodename 구분하여 변수 지정하기
    let station_code = $(this).find('nodeid').text();
	let station_name = $(this).find('nodename').text();
	
	
	console.log(`역 코드 : ${station_code}, 역 이름 : ${station_name}`);
	});
});
