const express = require("express");
const app = express();
const bookRoutes = require("./bookRoutes");
const {notFound, errorHandler} = require("./error");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.json());

app.use("/", bookRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;