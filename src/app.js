const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://db:27017/booksapi'; // when using docker-compose for full development
const url = 'mongodb://localhost:27017/booksapi';


app.use(express.json());

let booksPromise = MongoClient.connect(url).then(function(client) {
    return client.db().collection("books");
});

app.post("/book", async function (req, res, next) {
    const {title, authors, isbn, description} = req.body;
    try {
        const books = await booksPromise;
        await books.updateOne(
            {isbn: isbn},
            {$set : {title, authors, isbn, description} },
            {upsert: true});
        res.json({title, authors, isbn, description});
    } catch (e) {
        next(e);
    }
});

app.get("/book/:isbn", async function (req, res, next) {
    const isbn = req.params.isbn;
    try {
        const books = await booksPromise;
        const book = await books.findOne(
            {isbn},
            {projection: {_id: 0}}
        );
        res.json(book);
    } catch(e) {
        next(e);
    }
});

app.use(function notFound(req, res, next) {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.json({message: err.message, error: err.stack});
}

app.use(errorHandler);

module.exports = app;