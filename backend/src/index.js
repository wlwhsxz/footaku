const { createServer } = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const env = require("./envconfig");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

require("./utils/io")(io);
httpServer.listen(env.PORT || 8000, () => {
  console.log("PORT:", env.PORT);
  console.log("DB_HOST:", env.DB_HOST);
  console.log("DB_NAME:", env.DB_NAME);
  // console.log(`Server is running on port ${port}`);
});