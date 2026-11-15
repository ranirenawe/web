const html = document.documentElement;
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

// show / hide password
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
}

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const usernameOrEmail = document.getElementById('userInput').value.trim();
  const password = document.getElementById('passInput').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  let user = users.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail);

  let nameOrEmail = 'test';
  let pass = 'password';

  if (user != undefined) {
    nameOrEmail = usernameOrEmail; // user may log in with username OR email
    pass = user.password;
  }

  if (usernameOrEmail === nameOrEmail && password === pass) {
    loginMessage.textContent = 'Login successful!';
    loginMessage.classList.remove('text-red-500');
    loginMessage.classList.add('text-green-500');
  } else {
    loginMessage.textContent = 'Invalid username/email or password.';
    loginMessage.classList.remove('text-green-500');
    loginMessage.classList.add('text-red-500');
  }
});