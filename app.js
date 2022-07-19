"use strict";

const express = require("express");
const path = require("path");
// refresher on what exactly this is...
const cors = require("cors");

const {NotFoundError} = require('./expressError');

const {authenticateJWT} = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const authorsRoutes = require("./routes/authors");
const worksRoutes = require("./routes/works");
const linesRoutes = require("./routes/lines");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authenticateJWT);

// not sure where this should go (if even works...)
app.use(express.static(path.resolve(__dirname, "./frontend/epic-viewer/build")));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/lines", linesRoutes);
app.use("/api/authors", authorsRoutes);
app.use("/api/works", worksRoutes);


app.use(function(req, res, next) {
  return next(new NotFoundError());
});

app.use(function(err, req, res, next) {
  if(process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: {message, status}
  });
});




module.exports = app;