const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectToDatabase } = require("./db/db");
const { insertDummyUsers, insertDummyPosts } = require("./db/dummyData.js");
const { errorHandler } = require("./middlewares/errorHandler");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "http://43.203.44.253:3000",
  "http://43.203.44.253:8080",
];

const corsOptions = {
  // origin: allowedOrigins,
  credentials: true, // 쿠키를 허용하기 위한 설정
};

// const multer = require('multer');
// const path = require('path');
// const fs = require("fs");

// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDatabase()
  .then(async (db) => {
    app.use("/", indexRouter);

    await insertDummyUsers();
    await insertDummyPosts();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.use("/static", express.static("public")); // 정적파일 관리 경로
app.use("/api/auths", authRouter);
app.use("/api/posts", postRouter);
app.use(errorHandler);

module.exports = app;
