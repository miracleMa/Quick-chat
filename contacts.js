
const contactsList = document.getElementById('contacts-list');
const storedCurrentUser = localStorage.getItem('currentUser');
const currentUser = JSON.parse(storedCurrentUser);
const storedUsers = JSON.parse(localStorage.getItem('users'));

storedUsers.forEach((user) => {
  if (user.username !== currentUser.username) {
    const contactElement = document.createElement('LI');
    const contactLink = document.createElement('A');
    contactLink.textContent = user.username;
    contactLink.href = `chat.html?contact=${user.username}`;
    contactElement.appendChild(contactLink);
    contactsList.appendChild(contactElement);
  }
});
