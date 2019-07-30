const bookControllerFactory = require("../../src/bookController");
const assert = require("assert");

describe("Book controller", function() {
    it("create or update happy path", async function() {
        // given
        const req = {
            body: {
                isbn: "ISBN"
            }
        };
        const res = {
            redirect(path) {
                res.redirect.invokedWith = path;
            }
        };
        const bookService = {
            async createOrUpdate(book) {
                bookService.createOrUpdate.invokedWith = book;
            }
        };
        const bookController = bookControllerFactory({bookService});

        // when
        await bookController.createOrUpdate(req, res);

        // then
        assert.deepStrictEqual(res.redirect.invokedWith, "/book/ISBN");
        assert.deepStrictEqual(bookService.createOrUpdate.invokedWith, {isbn: "ISBN"});
    });

    it("create or update unhappy path", async function() {
        // given
        const req = {};
        const res = {};
        const bookService = {
            async createOrUpdate() {
                throw "error";
            }
        };
        const next = function(error) {
            next.invokedWith = error;
        };
        const bookController = bookControllerFactory({bookService});

        // when
        await bookController.createOrUpdate(req, res, next);

        // then
        assert.deepStrictEqual(next.invokedWith, "error");
    })
});