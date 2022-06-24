const server = require("./express-server/server"),
    router = require("./express-server/router"),
    requestHandlers = require("./express-server/requestHandlers");

const handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
