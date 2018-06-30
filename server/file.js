var http = require('http');
var fs = require('fs'),
    path = require('path'),    
    porn_sites_filePath = path.join(__dirname, '/data_url/porn_sites.txt'),
    porn_ads_filePath = path.join(__dirname, '/data_url/porn_ads.txt');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var porn_sites = "";
  response.writeHead(200, {"Content-Type": "text/json"});
  fs.readFile(porn_sites_filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        porn_sites = data.split(',');
    } else {
        console.log(err);
    }
  });
  response.write(JSON.stringify(porn_sites));
  response.end();
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
