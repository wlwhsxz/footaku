const fs = require('fs');
const { createServer } = require("https");
const app = require("./app");
const { Server } = require("socket.io");
const env = require("./envconfig");
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/footaku.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/footaku.com/fullchain.pem')
};
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8000",
  "https://footaku.com",
  "https://footaku.com:8000",
];

const httpServer = createServer(options, app);
const io = new Server(httpServer, {
  cors: {
    allowedOrigins
  },
});

require("./utils/io")(io);
httpServer.listen(env.PORT || process.env.production.PORT, () => {
  console.log("PORT:", env.PORT);
  console.log("ENV:", env.NODE_ENV);
  console.log("DB_HOST:", env.DB_HOST);
  console.log("DB_NAME:", env.DB_NAME);
});
