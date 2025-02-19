
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendMessageForm = document.getElementById('send-message-form');
const storedCurrentUser = localStorage.getItem('currentUser');
const currentUser = JSON.parse(storedCurrentUser);
const contactUsername = new URLSearchParams(window.location.search).get('contact');

document.getElementById('chat-header').textContent = `Chat with ${contactUsername}`;

const conversationId = getConversationId(currentUser.username, contactUsername);
let messages = [];

if (localStorage.getItem('messages')) {
  const storedMessages = JSON.parse(localStorage.getItem('messages'));
  messages = storedMessages[conversationId] || [];
}

messages.forEach((message) => {
  const messageElement = createMessageElement(message, currentUser);
  messageContainer.appendChild(messageElement);
});

sendMessageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message === '') {
    alert('Please enter a message.');
    return;
  }
  const newMessage = {
    username: currentUser.username,
    message,
    timestamp: new Date().toLocaleTimeString(),
  };
  messages.push(newMessage);
  saveMessagesToLocalStorage(conversationId, messages);
  messageInput.value = '';
  const messageElement = createMessageElement(newMessage, currentUser);
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
});

setInterval(() => {
  if (localStorage.getItem('messages')) {
    const storedMessages = JSON.parse(localStorage.getItem('messages'));
    const newMessages = storedMessages[conversationId] || [];
    newMessages.forEach((message) => {
      if (!messages.find((m) => m.timestamp === message.timestamp)) {
        const messageElement = createMessageElement(message, currentUser);
        messageContainer.appendChild(messageElement);
        messages.push(message);
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    });
  }
}, 1000);
function getConversationId(user1, user2) {
    return [user1, user2].sort().join('-');
  }
  
  function createMessageElement(message, currentUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (message.username === currentUser.username) {
      messageElement.classList.add('message-sender');
    } else {
      messageElement.classList.add('message-receiver');
    }
    const messageHeaderElement = document.createElement('div');
    messageHeaderElement.classList.add('message-header');
    const messageUsernameElement = document.createElement('span');
    messageUsernameElement.textContent = message.username;
    const messageTimestampElement = document.createElement('span');
    messageTimestampElement.textContent = message.timestamp;
    messageHeaderElement.appendChild(messageUsernameElement);
    messageHeaderElement.appendChild(messageTimestampElement);
    const messageTextElement = document.createElement('div');
    messageTextElement.classList.add('message-text');
    messageTextElement.textContent = message.message;
    messageElement.appendChild(messageHeaderElement);
    messageElement.appendChild(messageTextElement);
    return messageElement;
  }
  function saveMessagesToLocalStorage(conversationId, messages) {
    if (localStorage.getItem('messages')) {
      const storedMessages = JSON.parse(localStorage.getItem('messages'));
      storedMessages[conversationId] = messages;
      localStorage.setItem('messages', JSON.stringify(storedMessages));
    } else {
      const messagesObject = {};
      messagesObject[conversationId] = messages;
      localStorage.setItem('messages', JSON.stringify(messagesObject));
    }
  }
    