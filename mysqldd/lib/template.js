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
      h1 {
      font-size:45px;
      text-align: center;
      border-bottom:3px solid gray;
      margin:0;
      padding:20px;
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
     

      ol{
      border-right:5px solid gray;
      width:150px;
      margin:0;
      padding:20px;
      }

      #grid{
        display: grid;
        grid-template-columns: 200px 1fr;
      }

      #article{
        padding-left:15px;
      }

      #what{
        padding-bottom:15px;
      }
     </style>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
      
    </head>
    <body>
      
      <header>
        <h1><a href="/">고객상담센터</a></h1>
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
      
        ${control}
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
