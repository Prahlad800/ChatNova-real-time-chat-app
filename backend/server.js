import app from "./src/app/app.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import setupSocket from "./src/app/socket.js";

const port = 2020;

// express → http server
const httpServer = createServer(app);

// socket attach
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// 👇 yaha use kar rahe socket file
setupSocket(io);

// listen (IMPORTANT)
httpServer.listen(port, () => {
  console.log("Server running on", port);
});