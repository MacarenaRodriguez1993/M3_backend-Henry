
var fs = require('fs');
var request = require('request');
module.exports = {
    pwd: function() {process.stdout.write(process.cwd())},
    date: function() {process.stdout.write(Date())},
    ls:function(){
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            files.forEach(function(file) {
              process.stdout.write(file.toString() + "\n");
            })
            process.stdout.write("prompt > ");
          });
    },
    echo:function(args){
       process.stdout.write(args.join(' ')) 
    },
    cat:function(file){
        fs.readFile(file[0],'utf8',function(err,data){
            if(err) throw err
            process.stdout.write(data)
            process.stdout.write('\nprompt > ');
        })
    },
    head:function(args){
        fs.readFile(args[0],'utf8',function(err,data){
            if(err)throw err
            process.stdout.write(data.split('\n').splice(0,10).join('\n'))
        })
    },
    tail:function(args){
        fs.readFile(args[0],'utf8',function(err,data){
            if(err) throw err
            process.stdout.write(data.split('\n').splice(-args[1]).join('\n'))
        })
    },
    curl:function(args){
        request(args[0],function(err,data){
            if(err) throw err;
            process.stdout.write(data.body)
        })
    }
}