const fs = require("fs"),
    formidable = require("formidable");

function start(response){
    console.log("Request handler 'start' has been called...");
    const body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request){
    console.log("Request handler 'upload' has been called...");

    const form = new formidable.IncomingForm();
    console.log("About to parse");
    form.parse(request, function(error, fields, files){
        console.log("parsing done");
        fs.cp(files.upload.filepath, "./tmp/test.jpg", function(error){
            if(error){
                throw error;
            }
        });
    
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response){
    console.log("Request handler 'show' was called.");
    response.writeHead(200, {"content-type": "image/jpg"});
    fs.createReadStream("./tmp/test.jpg").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
