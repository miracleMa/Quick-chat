
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendMessageForm = document.getElementById('send-message-form');


const storedCurrentUser = localStorage.getItem('currentUser');
if (storedCurrentUser) {
  const currentUser = JSON.parse(storedCurrentUser);

  
  let storedMessages = JSON.parse(localStorage.getItem('messages')) || [];

  
  storedMessages.forEach((message) => {
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

    storedMessages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(storedMessages));

    messageInput.value = '';
    const messageElement = createMessageElement(newMessage, currentUser);
    messageContainer.appendChild(messageElement);
  });

  
  setInterval(() => {
    const updatedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const newMessages = updatedMessages.filter((message, index) => index >= storedMessages.length);

    newMessages.forEach((message) => {
      const messageElement = createMessageElement(message, currentUser);
      messageContainer.appendChild(messageElement);
      storedMessages.push(message);
    });
  }, 1000);
} else {
  console.log('No current user found');
  alert('No user logged in.');
}


function createMessageElement(message, currentUser) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
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

  if (message.username === currentUser.username) {
    messageElement.classList.add('message-sender');
  } else {
    messageElement.classList.add('message-receiver');
  }

  messageElement.appendChild(messageHeaderElement);
  messageElement.appendChild(messageTextElement);

  return messageElement;
}

