const express = require("express");
const app = express();
const bookRoutes = require("./bookRoutes");
const {notFound, errorHandler} = require("./error");


app.use(express.json());

app.use("/", bookRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;