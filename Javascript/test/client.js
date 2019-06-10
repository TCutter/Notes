const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req,res)=>{
    var param = req.url.split("?");

    if(param[0]=== "/getData"){
        if(!!param[1]){
            let filename = param[1].split("=")[1] + ".json";
            let path1 = path.join(__dirname, filename)
            console.log(path1);
            fs.readFile(path1,function(err,data){
                if(err){
                    res.writeHeader(404, {
                        'content-type': 'text/html;charset="utf-8"'
                    });
                    res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
                    res.end();
                }else{
                    res.writeHead(200,{"Content-Type":"application/json"});
                    res.write(data);
                    res.end();
                }
            });
        }
    }
       
}).listen(8080);
