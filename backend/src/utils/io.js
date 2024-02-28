const { User } = require("../db/models/index");
const chatController = require("../controllers/chatController");

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("a user connected", socket.id);

    socket.on("login", async (user, callback) => {
      // 유저 정보 저장
      user.online = true;
      socket.userId = user.userId;
      callback({ status: "ok", message: "로그인 성공", data: user });
    });

    socket.on("sendMessage", async (message, callback) => {
      try {
        // 유저 찾기 - socket Id
        console.log("socket.userId", socket.userId);
        const user = await User.findOne({ userId: socket.userId });
        console.log("user", user);
        // 메시지 저장(유저)
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message", newMessage);
        callback({
          status: "ok",
          message: "메시지 전송 성공",
          data: newMessage,
        });
      } catch (error) {
        console.error(error);
        callback({ status: "error", message: "메시지 전송 실패" });
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
