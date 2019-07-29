const express = require("express");
const app = express();


function auth(req, res, next) {
    console.log("doing auth");
    next();
}

function log(req, res, next) {
    console.log("new request at " + new Date());
    next();
}

// app.use(log);
app.use(auth);


app.get("/hello", log, auth, function(req, res) {
    throw new Error("oh noooo");
    res.send("hello");
});

app.get("/world", function(req, res) {
    res.send("world");
});

app.use(function notFound(req, res, next) {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message, error: err.stack});
}

app.use(errorHandler);


app.listen(3000, function () {
    console.log("Listening on port: " + 3000);
});
