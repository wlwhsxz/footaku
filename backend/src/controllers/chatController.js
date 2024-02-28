const chatService = require("../services/chatService");

const saveChat = async (message, user) => {
  console.log(message, user);
  const newMessage = await chatService.saveChat(message, user);
  return newMessage;
};

module.exports = { saveChat };
