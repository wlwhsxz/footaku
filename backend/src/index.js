const fs = require("fs");
const app = require("./app");
const { Server } = require("socket.io");
const env = require("./envconfig");
const { createServer } =
  env.NODE_ENV === "production" ? require("https") : require("http");

const options =
  env.NODE_ENV === "production"
    ? {
        key: fs.readFileSync("/etc/letsencrypt/live/footaku.com/privkey.pem"),
        cert: fs.readFileSync(
          "/etc/letsencrypt/live/footaku.com/fullchain.pem"
        ),
      }
    : {};

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://footaku.com",
  "https://footaku.com:8000",
];

const server = createServer(options, app);
const io = new Server(
  server,
  {
    cors: {
      allowedOrigins,
    },
  }
);

require("./utils/io")(io);
server.listen(env.PORT || process.env.production.PORT, () => {
  console.log("PORT:", env.PORT);
  console.log("ENV:", env.NODE_ENV);
  console.log("DB_HOST:", env.DB_HOST);
  console.log("DB_NAME:", env.DB_NAME);
});
