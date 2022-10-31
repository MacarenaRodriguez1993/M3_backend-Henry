const commands = require('./commands');

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
 
  var args = data.toString().trim().split(' ');
  var cmd=args.shift(); // remueve la nueva línea
  if(commands[cmd]){
    commands[cmd](args)
  }else{
    process.stdout.write('comando no encontrado ');
  }
  process.stdout.write('\nprompt > ');
});