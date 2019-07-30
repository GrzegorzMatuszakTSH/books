module.exports = {
    createOrUpdate(isbn , res) {
        res.redirect("/book/" + isbn);
    },
    details({book, layout}, res, next) {
        book ? res.format({
            "default"() {
                res.json(book);
            },
            "text/html"() {
                res.render("book", {book, layout});
            },
            "application/json"() {
                res.json(book);
            }

        }) : next();
    },
    delete(res) {
        res.status(204).end();
    }
}