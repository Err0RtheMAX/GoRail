
function getTourData($mapX, $mapY) {
let request = require('request');
let cheerio = require('cheerio');
// 사전에 cmd 창에서 npm install request --save,
// npm install cheerio --save을 입력하여 패키지 설치해야 구동이 됨.
const $url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList'

const $KEY = 'Y%2Fp5JLBmrkILvFkISB3Yp282tJ9n4Syw7T6U7rK5JjokV53hvlumKQOVZW%2FK9tGdJtL4HUW6IB1%2Bmr59et%2B9sQ%3D%3D'
// 미리 받은 인증 키
const $numOfRows = '10'
const $pageNo = '10'
const $MobileOS = 'WIN'
const $MobileApp = 'trainPortal'
const $arrange = 'E'
const $contentTypeId = '15'
const $radius = '10000'
const $listYN = 'Y'

const  $api_url = $url + '?serviceKey=' + $KEY + 
						'&numOfRows=' + $numOfRows + 
						'&pageNo=' + $pageNo + 
						'&MobileOS=' + $MobileOS + 
						'&MobileApp=' + $MobileApp + 
						'&arrange=' + $arrange + 
						'&contentTypeId=' + $contentTypeId + 
						'&radius=' + $radius + 
						'&listYN=' + $listYN + 
						'&mapX=' + $mapX + 
						'&mapY=' + $mapY;



console.log($api_url);

request($api_url, function(err, res, body) {
	$ = cheerio.load(body);
	
	$('item').each(function(idx){
	// vehiclekndid, vehiclekndnm
	let firstimage2 = $(this).find('firstimage2').text();
	let tel = $(this).find('tel').text();
	let add1 = $(this).find('add1').text();
    let add2 = $(this).find('add2').text();
    let title = $(this).find('title').text();
	let dist = $(this).find('dist').text();
	
	
	console.log(`타이틀 : ${title}, 주소 : ${add1} ${add2}, 거리 : ${dist}m , 이미지 : ${firstimage2}, 전화번호 : ${tel}`);
	});
});

}
// item 태그 안의 vehiclekndid 태그와 vehiclekndnm 태그를 구분하여 텍스트 가져와서 콘솔에 출력

getTourData(126.981611, 37.568477);