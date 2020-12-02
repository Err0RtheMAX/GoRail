var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql'); 

var db = mysql.createConnection({
	host     : 'localhost',
	user     : 'nodejs',
	password : '0000',
	database : 'train'
  });
  db.connect();

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.static(__dirname + ''));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function templateHTML(title, list, body, control){
	return `
	<!doctype html>
	<html>
	<head>
	  <title>WEB1 - ${title}</title>
	  <meta charset="utf-8">
	  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-525PG0WVQ1"></script>
  <script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
  
	gtag('config', 'G-525PG0WVQ1');
  </script>
	</head>
	<body>
	  <h1><a href="/">고객상담센터</a></h1>
	  <iframe width="560" height="315" src="https://www.youtube.com/embed/3n8106brsg4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	  ${list}
  
	  ${control}
	  ${body}
	  <!--Start of Tawk.to Script-->
  <script type="text/javascript">
  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/5fb2cf971535bf152a568baa/default';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
  })();
  </script>
  
  
	</body>
	</html>
	`;
  }
function templateList(filelist){
	var list = '<ul>';
	var i = 0;
	while(i < filelist.length){
	  list = list + `<li><a href="/bbs?id=${filelist[i]}">${filelist[i]}</a></li>`;
	  i = i + 1;
	}
	list = list+'</ul>';
	return list;
  }

app.use('/', function (request, response, next) {
	if (request.session.loggedin == true || request.url == "/login" || request.url == "/register") {
		next();
	}
	else {
		response.sendFile(path.join(__dirname + '/login.html'));
	}
});

app.get('/main', function (request, response) {
	response.sendFile(path.join(__dirname + '/main.html'));
});

app.get('/login', function (request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/course', function (request, response) {
	response.sendFile(path.join(__dirname + '/course.html'));
});

app.get('/places', function (request, response) {
	response.sendFile(path.join(__dirname + '/places.html'));
});

app.get('/station', function (request, response) {
	var name = request.body.id;
	response.sendFile(path.join(__dirname + '/station.html'));
});

app.get('/map', function (request, response) {
	response.sendFile(path.join(__dirname + '/map.html'));
});

app.get('/register', function (request, response) {
	response.sendFile(path.join(__dirname + '/register.html'));
});

app.get('/logout', function (request, response) {
	request.session.loggedin = false;
	response.redirect('/login');
	response.end();
});

app.get('/bbs', function (request, response) {
	var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
	if(queryData.id === undefined){
        db.query(`SELECT * FROM topic`, function(error,topics){
          
          var title = '안녕하세요 고객상담센터입니다.';
          var description = '불편사항이나 건의내용이 있다면 글남기기 버튼을 이용해 글을 남겨주세요!';
          var video = '<iframe width="560" height="315" src="https://www.youtube.com/embed/3n8106brsg4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
          
          var list = template.list(topics);
          var html = template.HTML(title, list,
            `<h2>${title}</h2><h3>${description}</h3><h3>${video}</h3>`,
           // `<a href="/create">글 남기기</a>`,
            `<button type="button" onclick="location.href='/create'">글 남기기</button>`

          );
          response.writeHead(200);
          response.end(html);
        });
      } else {
        db.query(`SELECT * FROM topic`, function(error,topics){
         if(error){
           throw error;
         }
         db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id], function(error2, topic){
           if(error2){
             throw error2;
           }
          var title = topic[0].title;
          var description = topic[0].description;
          var list = template.list(topics);
          var html = template.HTML(title, list,
            `<h2>${title}</h2> <h3>${description}</h3>`,
            ` <button type="button" onclick="location.href='/create'">글 남기기</button>
                
                <button type="button" onclick="location.href='/update?id=${queryData.id}'">글 수정하기</button>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${queryData.id}">
                  <div id = article> <input type="submit" value="글 삭제하기"> </div>
                </form>`
          );
          response.writeHead(200);
          response.end(html);
         })
      });
      }

});

app.get('/create', function (request, response) {
	db.query(`SELECT * FROM topic`, function(error,topics){
        var title = '글 남기기';
        var list = template.list(topics);
        var html = template.HTML(title, list,
          `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<button type="button" onclick="location.href='/create'">글 남기기</button>`
        );
        response.writeHead(200);
        response.end(html);
      });
});

app.post('/create_process', function (request, response) {
	var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var qs = require("querystring");
          var post = qs.parse(body);
          db.query(`
            INSERT INTO topic (title, description, created, author_id) 
              VALUES(?, ?, NOW(), ?)`,
            [post.title, post.description, 1], 
            function(error, result){
              if(error){
                throw error;
              }
              response.writeHead(302, {Location: `/bbs?id=${result.insertId}`});
              response.end();
            }
          )
      });
});

app.get('/update', function (request, response) {
	db.query('SELECT * FROM topic', function(error, topics){
        if(error){
          throw error;
        }
        db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id], function(error2, topic){
          if(error2){
            throw error2;
          }
          var list = template.list(topics);
          var html = template.HTML(topic[0].title, list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${topic[0].id}">
              <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
              <p>
                <textarea name="description" placeholder="description">${topic[0].description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            `<button type="button" onclick="location.href='/create'">글 남기기</button>
             <button type="button" onclick="location.href='/update?id=${queryData.id}'">글 수정하기</button>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
});
app.post('/update_process', function (request, response) {
	var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query('UPDATE topic SET title=?, description=?, author_id=1 WHERE id=?', [post.title, post.description, post.id], function(error, result){
            response.writeHead(302, {Location: `/?id=${post.id}`});
            response.end();
          })
      });
});

app.post('/delete_process', function (request, response) {
	var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query('DELETE FROM topic WHERE id = ?', [post.id], function(error, result){
            if(error){
              throw error;
            }
            response.writeHead(302, {Location: `/`});
            response.end();
          });
      });
});



app.post('/login', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username == "111" && password == "111") {
		request.session.loggedin = true;
		request.session.username = username;
		response.redirect('/main');
		response.end();
	} else {
		response.send(username);
		response.send(password);
		response.end();
	}
});




app.listen(3000);