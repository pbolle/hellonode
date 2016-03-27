var http = require('http');
var os = require('os');

function getIPAddress() {
  var interfaces = os.networkInterfaces();
  var ips = "[";
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
       if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        ips = ips +  " " + alias.address;
    }
  }

  return ips + "]";
}

var handleRequest = function(request, response) {
  
  response.writeHead(200);
  response.end("Hello World! hostname:"+os.hostname()+" ip:"+ getIPAddress());
}
var www = http.createServer(handleRequest);
www.listen(8080);
