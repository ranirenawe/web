const html = document.documentElement;
const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

// date of birth can't be in the future
document.getElementById('dateInput').max = new Date().toISOString().split('T')[0];

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

function showError(msg) {
  registerMessage.textContent = msg;
  registerMessage.classList.remove("text-green-500");
  registerMessage.classList.add("text-red-500");
}

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('userInput').value.trim();
  const email = document.getElementById('mailInput').value.trim();
  const password = document.getElementById('passInput').value;
  const confirmPassword = document.getElementById('confirmInput').value;
  const dob = document.getElementById('dateInput').value;

  registerMessage.textContent = "";

  if (password.length < 6) {
    showError("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    showError("Passwords do not match.");
    return;
  }

  try {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.username === username || user.email === email)) {
      showError("Username or email already exists.");
      return;
    }

    users.push({ username, email, password, dob });
    localStorage.setItem('users', JSON.stringify(users));

    registerMessage.textContent = "Registration successful! Redirecting to login...";
    registerMessage.classList.remove("text-red-500");
    registerMessage.classList.add("text-green-500");

    registerForm.reset();
    setTimeout(() => {
      window.location.href = '/src/login.html';
    }, 1500);
  } catch (error) {
    showError("An error occurred during registration.");
  }
});