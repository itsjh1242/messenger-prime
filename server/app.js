const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();

app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

require("./io")(io);
httpServer.listen(5000, () => {
  console.log("Web Socket Server is running on port 5000.");
});
