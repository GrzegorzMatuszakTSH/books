// const bookRepository = require("./bookRepository");
const makeSlug = require("./makeSlug");

module.exports = bookRepository => ({
    async createOrUpdate({title, authors, isbn, description}) {
        const slug = makeSlug(title);
        return bookRepository.createOrUpdate({title, slug, authors, isbn, description});
    }
});