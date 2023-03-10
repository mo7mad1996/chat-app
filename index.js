// var WiFiControl = require("wifi-control");

// //  Initialize wifi-control package with verbose output
// WiFiControl.init({
//   debug: true,
// });

// //  Try scanning for access points:
// WiFiControl.scanForWiFi(function (err, response) {
//   if (err) console.log(err);
//   console.log(response);
// });
console.clear();
const express = require("express");
const app = express();
const server = app.listen(process.env.PORT || 3000);
app.use(express.static("./static"));

const socketio = require("socket.io");
const IO = socketio(server);

IO.on("connection", (socket) => {
  socket.on("client => server", (data) =>
    IO.to(data.room).emit("client <= server", data)
  );
  socket.on("join room", (room) => socket.join(room));
  socket.on("leave room", (room) => socket.leave(room));
});
