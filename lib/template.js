module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
     <style>
       body{
       margin:0;
       }
     
     .saw {
      color:gray;
      }
      a {
      color:black;
      text-decoration: none;
     }
      hq {
      font-size:15px;
  
      border-Top:3px solid gray;
      margin:-5;
      padding:-5px;
    }

    .button:hover {
        background-color: blue;
    }
    
   


     
     h2 {
      font-size:30px;
  
      border-bottom:2px solid gray;
      margin:0;
      padding:20px;


     }
     #bt{
      width:120px;
      height: 40px;
      color:#fff;
      background: #004fff;
      font-size: 16px;
      border:none;
      border-radius: 20px;
      box-shadow: 0 4px 16px rgba(0,79,255,0.3);
      transition:0.3s;
      position: absolute;
      left:1000px;
      top:500px;
      transform: translate(-50%,-50%);
    }
    #bt:focus {
      outline:0;
    }
    #bt:hover{
      background: rgba(0,79,255,0.9);
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,79,255,0.6);
    }
    
    #w{
      width:120px;
      height: 40px;
      color:#fff;
      background: #004fff;
      font-size: 16px;
      border:none;
      border-radius: 20px;
      box-shadow: 0 4px 16px rgba(0,79,255,0.3);
      transition:0.3s;
      position: absolute;
      left:1150px;
      top:500px;
      transform: translate(-50%,-50%);
    }

    #w:focus {
      outline:0;
    }
    #w:hover{
      background: rgba(0,79,255,0.9);
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,79,255,0.6);
    }
    

      ol{
      border-right:5px solid gray;
      width:200px;
      margin:0;
      padding:20px;
      }

      #grid{
        display: grid;
        grid-template-columns: 200px 1fr;
      }

      #article{
        padding-left:10px;
      }

      #what{
        padding-bottom:15px;
      }
     </style>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
      

      
<head>
<!-- bootstrap 파일 불러오기 -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
  integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
  crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
  integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
  crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
  integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
  crossorigin="anonymous"></script>
<meta charset="utf-8">
</head>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<a class="navbar-brand" href="http://localhost:3000/main">Logo</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">
    <li class="nav-item">
      <a class="nav-link" href="http://localhost:3000/course">course</a>
    </li>
  </ul>

  <ul class="nav navbar-nav navber-right">
    <li class="nav-item">
      <form class="form-inline my-2 my-lg-0" action="http://localhost:3000/station">
        <input class="form-control mr-sm-2" type="search" name="name" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </li>
    <li class="nav-item">
      <a style="margin-left: 10px;" class="nav-link" href="http://localhost:3000/logout">로그아웃</a>
    </li>
    <li class="nav-item">
      <a style="margin-left: 10px;" class="nav-link" href="http://localhost:3001/">고객센터</a>
    </li>
  </ul>
</div>
</nav>

    </head>
    <body>
      
      <header>
        
      </header>
      <tr></tr>
      
      
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
      
      <div id = grid>
        <ol>
        ${list} 
        
       
        
        <div id=what>
        <hq>
        ${control}
        </hq>
        </div>
        </ol>


        
        <div id = article>

        
        ${body}

        </div>

        </div>
       
        
     
    </body>
    
    </html>
    `;
  },list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}
