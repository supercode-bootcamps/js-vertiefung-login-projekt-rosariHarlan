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

// --- Check user input and set cookie with API ---

let checkInput = () => {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    let username = usernameInput.value.toLowerCase();
    let password = passwordInput.value;
    fetch("https://supercode-auth-demo.herokuapp.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        secret: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          loginMessage.innerHTML = " ";
          welcome.innerHTML = `>welcome, ${username}`;
          setCookie("username", username, 1);
          setCookie("logged_in", "true", 1);
          blurElement.classList.remove("blur");
          loginPopup.style.display = "none";
        } else {
          loginMessage.innerHTML = data.message;
        }

        if (data.message === "wrong password") {
          asterisk.classList.add("wrongPw");
          passwordInput.classList.add("red");
        }

        if (data.message === "user not found") {
          usernameInput.classList.add("red");
          asterisk.classList.add("wrongId");
        }
      });
  });
};

checkInput();

// --- Remove cookie ---

let removeCookie = () => {
  logout.addEventListener("click", (e) => {
    loginForm.reset();
    location.reload();
    setCookie("username", " ", -1);
    setCookie("logged_in", " ", -1);
  });
};

removeCookie();
