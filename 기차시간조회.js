// JavaScript Document
let request = require('request');
let cheerio = require('cheerio');
// 사전에 cmd 창에서 npm install request --save,
// npm install cheerio --save을 입력하여 패키지 설치해야 구동이 됨.

const $url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getStrtpntAlocFndTrainInfo'
// 역 ID를 조회할 수 있는 open api url 주소

const $KEY = 'QLurjCdtJG0va%2BqBL78fNW8omrqpekw6IbOP5qa%2B1mQHG67kMOXgB53ssFbJdHV%2FvBDKl4WVSoKzuJySn02CIw%3D%3D'
// 미리 받은 인증 키

const $numOfRows = '1000';
// 한 페이지에 나올 결과 수를 1000개씩 출력되게 설정

const $pageNo = '1';
// 출력되는 페이지 첫번째 페이지로 출력하게 하기

const $depPlaceId = 'NAT010032';
// 출발하는 역 Id (예시 : 용산(NAT010032))

const $arrPlaceId = 'NAT140873';
// 도착하는 역 Id (예시 : 춘천(NAT140873))

const $depPlandTime = '20201101';
// 출발하는 날(YYYY/MM/DD)(예시 : 20201102)

const $trainGradeCode = '09';
// 00 - KTX, 01 - 새마을호, 02 - 무궁화호, 03 - 통근열차, 04 - 누리로, 06 - AREX 직통, 07 - KTX-산천
// 08 - ITX-새마을, 09 - ITX-청춘, 10 - KTX-산천, 15 - ITX-청춘, 17 - SRT

const  $api_url = $url + '?serviceKey=' + $KEY + '&numOfRows=' + $numOfRows + '&pageNo=' + $pageNo + '&depPlaceId=' + $depPlaceId + '&arrPlaceId=' + $arrPlaceId + '&depPlandTime=' + $depPlandTime + '&trainGradeCode=' + $trainGradeCode;

console.log($api_url);

request($api_url, function(err, res, body) {
	$ = cheerio.load(body);
	
	$('item').each(function(idx){
	// xml 코드에서 item 태그 안에 nodeid와 nodename 구분하여 변수 지정하기
    
	let cost = $(this).find('adultcharge').text();
	// 어른요금
	
	let arr_station = $(this).find('arrplacename').text();
	// 도착역	
		
	let arr_time = $(this).find('arrplandtime').text();
	// 도착예정시간
		
	let dep_station = $(this).find('depplacename').text();
	// 출발역
		
	let dep_time = $(this).find('depplandtime').text();
	// 출발예정시간
		
	let train_name = $(this).find('traingradename').text();
	// 기차 이름
		
	let train_num = $(this).find('trainno').text();
	// 탑승기차 No.
	
	
	console.log(`출발역 : ${dep_station}, 출발시간 : ${dep_time},\n도착역 : ${arr_station}, 도착시간 : ${arr_time},\n열차종류 : ${train_name}, 열차번호 : ${train_num}, 요금 : ${cost}\n\n`);
	// 출발, 도착 시간은 YYYY/MM/DD/hh/mm/ss 방식으로 표현
	});
});
