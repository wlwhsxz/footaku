const { Chat } = require("../db/models/index");

const saveChat = async (message, user) => {
  console.log(user);
  const newMessage = new Chat({
    chat: message,
    user: {
      id: user._id,
      name: user.userName,
    },
  });

  await newMessage.save();
  return newMessage;
};

module.exports = { saveChat };
