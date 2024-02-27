module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("a user connected", socket.id);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
