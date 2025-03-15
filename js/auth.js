document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const loggedInUser = localStorage.getItem("loggedInUser");
  const currentPage = window.location.pathname;

  if (!loggedInUser && !["/signup.html", "/login.html"].includes(currentPage)) {
    window.location.href = "login.html";
  }

  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});

function handleSignup(event) {
  event.preventDefault();
  const firstname = document.getElementById("firstname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById("repeat-password").value;

  if (password !== repeatPassword) {
    alert("Passwords do not match");
    return;
  }

  if (localStorage.getItem(`user:${email}`)) {
    alert("Email already exists");
  } else {
    const userData = { firstname, password };
    localStorage.setItem(`user:${email}`, JSON.stringify(userData));
    alert("Signup successful");
    window.location.href = "login.html";
  }
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const storedUserData = localStorage.getItem(`user:${email}`);
  if (storedUserData) {
    const { password: storedPassword } = JSON.parse(storedUserData);
    if (storedPassword === password) {
      localStorage.setItem("loggedInUser", email);
      window.location.href = "index.html";
    } else {
      alert("Invalid email or password");
    }
  } else {
    alert("Invalid email or password");
  }
}
