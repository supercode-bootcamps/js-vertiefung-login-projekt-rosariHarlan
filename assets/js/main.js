// --- Create HTML elements ---
const loginPopup = document.createElement("div");
loginPopup.id = "popup";
document.body.appendChild(loginPopup);

const loginForm = document.createElement("form");
loginForm.action = "#";
loginPopup.appendChild(loginForm);

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

// --- Global variables ---

const USERS = [
  { name: "supercode", secret: "no_one_will_know" },
  { name: "music_fan_1990", secret: "WeAreTheChampi0ns" },
  { name: "admin", secret: "1234" },
];

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
    USERS.find((x) => {
      if (x.secret === password) {
        console.log("yippie");
        setCookie("username", username, 10);
        setCookie("password", password, 10);
        setCookie("logged_in", "true", 10);
      } else {
        console.log("try again");
      }
    });
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
