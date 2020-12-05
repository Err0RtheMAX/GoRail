
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql'); 

var db =mysql.createConnection({
  host     : 'localhost',
  user     : 'nodejs',
  password : '0000',
  database : 'train'
});
db.connect();
 
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/bbs'){
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
    } else if(pathname === '/create'){
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
    } else if(pathname === '/create_process'){
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
    } else if(pathname === '/update'){
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
    } else if(pathname === '/update_process'){
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
    } else if(pathname === '/delete_process'){
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
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3001);