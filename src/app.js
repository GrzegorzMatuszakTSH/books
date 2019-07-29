const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://db:27017/booksapi'; // when using docker-compose for full development
const url = 'mongodb://localhost:27017/booksapi';


app.use(express.json());


// let books;
// MongoClient.connect(url, function(err, client) {
    // setTimeout(() => {
    //     books = client.db().collection("books");
    // }, 10000);

// });
let booksPromise = MongoClient.connect(url).then(function(client) {
    return client.db().collection("books");
});

app.post("/book", function(req, res, next) {
    const {title, authors, isbn, description} = req.body;

    booksPromise.then(function(books) {
        return books.updateOne(
            {isbn: isbn},
            {$set : {title, authors, isbn, description} },
            {upsert: true}
        );
    }).then(function() {
        res.json({title, authors, isbn, description});
    }).catch(next);

});

app.get("/book/:isbn", function (req, res, next) {
    const isbn = req.params.isbn;
    booksPromise
        .then(function (books) {
            return books.findOne(
                {isbn},
                { projection: {_id: 0} }
            );
        })
        .then(function (book) {
            res.json(book);
        }).catch(next);
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