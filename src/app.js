const express = require("express");
const app = express();

app.use(express.json());


app.post("/book", function(req, res) {
    const {title, authors, description, isbn} = req.body;
    res.json({title, authors, description, isbn});
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

module.exports = app;