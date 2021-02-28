// --- Create HTML elements ---
const loginPopup = document.createElement("div");
document.body.appendChild(loginPopup);

const loginForm = document.createElement("form");
loginForm.action = "#";
loginPopup.appendChild(loginForm);

const loginHeader = document.createElement("h2");
loginHeader.innerHTML = ">Login";
loginForm.appendChild(loginHeader);

let usernameInput = document.createElement("input");
usernameInput.type = "text";
usernameInput.name = "name";
usernameInput.id = "name";
usernameInput.placeholder = "username";
loginForm.appendChild(usernameInput);

let passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.name = "password";
passwordInput.id = "password";
passwordInput.placeholder = "password";
loginForm.appendChild(passwordInput);

const submit = document.createElement("input");
submit.type = "submit";
submit.value = "submit";
loginForm.appendChild(submit);

let loginMessage = document.createElement("p");
loginMessage.classList.add("message");
loginForm.appendChild(loginMessage);

// --- Global variables ---

const USERS = [
  { name: "supercode", secret: "no_one_will_know" },
  { name: "music_fan_1990", secret: "WeAreTheChampi0ns" },
  { name: "admin", secret: "1234" },
];

// --- Show popup onload ---

window.onload = () => {
  loginPopup.style.visibility = "visible";
};

// --- Set Cookie ---

const setCookie = (cname, cvalue, exdays) => {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

// --- Check user input and get cookie ---

let checkInput = () => {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    let username = usernameInput.value;
    let password = passwordInput.value;
    loginForm.reset();
    for (let x in USERS) {
      if (USERS[x].name === username && USERS[x].secret === password) {
        setCookie("username", username, 1);
        setCookie("password", password, 1);
        setCookie("logged_in", "true", 1);
        loginMessage.innerHTML = "Come on in!";
        loginMessage.style.color = "#000";
        loginPopup.classList.add("popup");
      } else if (USERS[x].name === username && USERS[x].secret !== password) {
        loginMessage.innerHTML = "*password is wrong";
      } else if (USERS[x].name !== username && USERS[x].secret !== password) {
        loginMessage.innerHTML = "*user does not exist";
      }
    }
  });
};

checkInput();

// --- Keep user logged in with cookie ---

function keepLogin() {
  const loggedIn = getCookie("logged_in");
  console.log(loggedIn);
  if (loggedIn === "true") {
    let userID = getCookie("username");
    console.log(userID);
    let pw = getCookie("password");
    usernameInput.value = userID;
    passwordInput.value = pw;
  }
}

keepLogin();
