const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

var app = express();

//SECTION - Websocket setup for server
const WebSocket = require("ws");
const server = new WebSocket.Server({
  port: 8080,
  // noServer: true,
});

let sockets = [];
server.on("connection", function (socket) {
  sockets.push(socket);

  // When you receive a message, send that message to every socket.
  socket.on("message", function (msg, isBinary) {
    const message = isBinary ? msg : msg.toString();
    sockets.forEach((s) => s.send(message));
  });

  // When a socket closes, or disconnects, remove it from the array.
  socket.on("close", function close(code, data) {
    const reason = data.toString();
    console.log(reason);
    sockets = sockets.filter((s) => s !== socket);
  });
});

setTimeout(function () {
  sockets.forEach((s) => s.send("reload browser"));
}, 2000);

//!SECTION - Websocket setup for server

//SECTION - Websocket setup for client
// let clients = [
//     new WebSocket("ws://localhost:8080"),
//     new WebSocket("ws://localhost:8080"),
// ];

// clients.map((client) => {
//     client.on("message", (msg) => console.log(msg));
// });

// // Wait for the client to connect using async/await
// await new Promise((resolve) => clients[0].once("open", resolve));

// // Prints "Hello!" twice, once for each client.
// clients[0].send("Hello!");
//!SECTION - Websocket setup for client

const db = require("./controller/database");

// NOTE - Connect database and initialize the database
db.connect();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes/index");
const invitationRouter = require("./routes/invitation");

app.use("/", indexRouter);
app.use("/invitation", invitationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
