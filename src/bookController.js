const mapValues = require("lodash.mapvalues");

function wrapWithTryCatch(fn) {
    return async function (req, res, next) {
        try {
            await fn(req, res, next);
        } catch (e) {
            next(e);
        }
    };
}

function withErrorHandling(api) {
    return mapValues(api, wrapWithTryCatch);
}

module.exports = ({bookService, bookRepository}) => withErrorHandling({
    async createOrUpdate(req, res, next) {
        // HTTP
        const book = req.body;
        // JS
        await bookService.createOrUpdate(book);
        // HTTP
        res.redirect("/book/" + book.isbn);
    },
    async details(req, res, next) {
        // HTTP
        const isbn = req.params.isbn;
        // JS
        const book = await bookRepository.findOne(isbn);
        // HTTP
        book ? res.format({
            "default"() {
                res.json(book);
            },
            "text/html"() {
                res.send("HTML");
            },
            "application/json"() {
                res.json(book);
            }

        }) : next();
    },
    async delete(req, res, next) {
        // HTTP
        const isbn = req.params.isbn;
        // JS
        await bookRepository.delete(isbn);
        // HTTP
        res.status(204).end();
    }
});
