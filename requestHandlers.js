var querystring = require("querystring");
var fs = require("fs");

function start(response, postData){
    console.log("Request handler 'start' has been called...");
    var body = '<html>' + 
                    '<head>' +
                        '<meta http-equiv="Content-Type" content="text/html; '+
                        'charset=UTF-8" />'+
                    '</head>'+
                    '<body>'+
                        '<form action="/upload" enctype="multipart/form-data" method="post">'+
                            '<input type="file" name="upload">'+
                            '<input type="submit" value="Upload file" />'+
                        '</form>'+
                    '</body>'+
                '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData){
    console.log("Request handler 'upload' has been called...");

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You have sent: " + querystring.parse(postData).text);
    response.end();
}

function show(response){
    console.log("Requst handler 'show' was called.");
    response.writeHead(200, {"content-type": "image/jpg"});
    fs.createReadStream("./tmp/test.jpg").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
