const loginForm = document.getElementById('loginform');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('userpassword');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === '' || password === '') {
    alert('Please fill in all fields.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    alert('Invalid username or password.');
    return;
  }

  // Store the current user in local storage
  localStorage.setItem('currentUser', JSON.stringify(user));

  alert('Login successful!');
  window.location.href = 'group-chat.html';
});
