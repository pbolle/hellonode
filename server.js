var http = require('http');
var os = require('os');
var counter = 0;
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

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
  console.log("request count:" + counter + " url:" + request.url);

  response.writeHead(200);
  response.end("Host info for:" + os.hostname() +
                "\n ip:" + getIPAddress() +
                "\n pid:" + process.pid +
                "\n env:" + JSON.stringify(process.env, null, 2));
  counter++;
}
var www = http.createServer(handleRequest);
www.listen(port, ip);
