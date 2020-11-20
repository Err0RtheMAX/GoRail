let request = require('request');
let cheerio = require('cheerio');
// 사전에 cmd 창에서 npm install request --save,
// npm install cheerio --save을 입력하여 패키지 설치해야 구동이 됨.
const $url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getVhcleKndList'

const $KEY = 'QLurjCdtJG0va%2BqBL78fNW8omrqpekw6IbOP5qa%2B1mQHG67kMOXgB53ssFbJdHV%2FvBDKl4WVSoKzuJySn02CIw%3D%3D'
// 미리 받은 인증 키

const  $api_url = $url + '?serviceKey=' + $KEY;

console.log($api_url);

request($api_url, function(err, res, body) {
	$ = cheerio.load(body);
	
	$('item').each(function(idx){
	// vehiclekndid, vehiclekndnm
    let train_num = $(this).find('vehiclekndid').text();
	let train_name = $(this).find('vehiclekndnm').text();
	
	
	console.log(`기차 번호 : ${train_num}, 기차 종류 : ${train_name}`);
	});
});

// item 태그 안의 vehiclekndid 태그와 vehiclekndnm 태그를 구분하여 텍스트 가져와서 콘솔에 출력