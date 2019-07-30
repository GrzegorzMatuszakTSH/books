const router = require('express').Router();
const bookController = require("./bookController");

router.post("/book", bookController.createOrUpdate);
router.get("/book/:isbn", bookController.details);
router.delete("/book/:isbn", bookController.delete);

module.exports = router;