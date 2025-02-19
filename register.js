
const registerForm = document.getElementById('registerForm');
const usernameInput = document.getElementById('registerUsername');
const emailInput = document.getElementById('registerEmail');
const passwordInput = document.getElementById('registerPassword');
const confirmPasswordInput = document.getElementById('registerConfirmPassword');


registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

 
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  
  if (username === '' || email === '' || password === '' || confirmPassword === '') {
    alert('Please fill in all fields.');
    return;
  }
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

if (!email.includes('@')) {
    alert('Invalid email address. Please enter a valid email address.');
    return;
  }

  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find((user) => user.username === username || user.email === email);

  if (existingUser) {
    alert('User already exists.');
    return;
  }

  
  const newUser = {
    username,
    email,
    password,
  };


users.push(newUser);


localStorage.setItem('users', JSON.stringify(users));


usernameInput.value = '';
emailInput.value = '';
passwordInput.value = '';
confirmPasswordInput.value = '';


alert('User registered successfully!');
});

