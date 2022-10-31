var fs  = require("fs")
var http  = require("http")

http.createServer(function(req,res){
    fs.readFile(`/images${req.url}.jpg`),function(err,data){
        if(err){
            res.writeHead(404,{'Content-Type':'text/plain'})
            res.end('img Not found')
        }else{
            res.writeHead(200,{'Content-Type':'image/jpeg'})
            res.end(data)
        }
    }
}).listen(3000,'127.0.0.1')
