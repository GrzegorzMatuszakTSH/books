const router = require('express').Router();
const bookRepository = require("./bookRepository");
const bookService = require("./bookService");
const bookController = require("./bookController")({bookRepository, bookService});

router.post("/book", bookController.createOrUpdate);
router.get("/book/:isbn", bookController.details);
router.delete("/book/:isbn", bookController.delete);

module.exports = router;