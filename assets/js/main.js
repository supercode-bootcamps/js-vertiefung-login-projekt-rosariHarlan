// --- Global variables ---

const USERS = [
  { name: "supercode", secret: "no_one_will_know" },
  { name: "music_fan_1990", secret: "WeAreTheChampi0ns" },
  { name: "admin", secret: "1234" },
];

let submit = document.getElementById("submit");
let loginPopup = document.getElementById("loginPopup");
let usernameInput = document.getElementById("name");
let passwordInput = document.getElementById("password");
let loginForm = document.getElementById("form");
let loginMessage = document.querySelector(".message");
let logout = document.getElementById("logout");
let welcome = document.getElementById("welcome");
let asterisk = document.getElementById("asterisks");
let blurElement = document.getElementById("loginForm");

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

// --- Keep user logged in with cookie ---

let keepLogin = () => {
  const loggedIn = getCookie("logged_in");
  if (loggedIn === "true") {
    let userID = getCookie("username");
    usernameInput.value = userID;
    welcome.innerHTML = `>welcome, ${usernameInput.value}`;
    loginPopup.style.display = "none";
    blurElement.classList.remove("blur");
  }
};

keepLogin();

// --- Check user input and get cookie ---

let checkInput = () => {
  submit.addEventListener("click", (e) => {
    let username = usernameInput.value.toLowerCase();
    let password = passwordInput.value;
    e.preventDefault();
    loginForm.reset();
    let user = USERS.find((x) => x.name === username && x.secret === password);
    if (user) {
      loginMessage.innerHTML = " ";
      welcome.innerHTML = `>welcome, ${username}`;
      setCookie("username", username, 1);
      setCookie("logged_in", "true", 1);
      blurElement.classList.remove("blur");
      loginPopup.style.display = "none";
    }

    if (!user) {
      loginMessage.innerHTML = "*user does not exist";
      asterisk.classList.add("wrong");
    }
  });
};

checkInput();

// --- Remove cookie ---

let removeCookie = () => {
  logout.addEventListener("click", (e) => {
    setCookie("username", " ", -1);
    setCookie("logged_in", " ", -1);
    welcome.innerHTML = ">welcome,";
    loginPopup.style.display = "block";
    loginPopup.classList.remove("popup");
    blurElement.classList.add("blur");
  });
};

removeCookie();
