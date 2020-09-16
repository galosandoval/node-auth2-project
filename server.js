const express = require("express");
const cors = require("cors");

// const authRouter = require("../auth/auth-router.js");
const usersRouter = require('./users/users-router')
// const restricted = require('../auth/restricted-middleware')
// const checkRole = require("../auth/check-role-middleware")

const server = express();

server.use(express.json());
server.use(
  cors({
    origin: "*",
    credentials: true, // works in tandem with the withCredentials option
  })
);

server.use("/api", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
