const http = require("http"),
    url = require("url");

function start(route, handle){
    function onRequest(request, response){
        const pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received");
        route(handle, pathname, request, response)
    }

    http.createServer(onRequest).listen(8080);
    console.log("Server has been started");
}

exports.start = start;
