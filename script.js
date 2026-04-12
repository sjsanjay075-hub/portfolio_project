// DARK MODE
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
};

if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}

// SHOW ADMIN
function showAdminLogin(){
  document.getElementById("admin-login").style.display = "block";
}

// ADMIN LOGIN
document.getElementById("admin-form").addEventListener("submit", function(e){
  e.preventDefault();

  let user = document.getElementById("usrname").value;
  let pass = document.getElementById("pswd").value;

  if (user === "admin" && pass === "1234") {
    alert("Access granted");
    document.getElementById("admin-login").style.display = "none";
    document.getElementById("user-responses").style.display = "block";
    showData();
  } else {
    alert("Invalid login");
  }
});

// EMAIL VALIDATION (LIVE)
let emailInput = document.getElementById("email");
let emailError = document.getElementById("emailError");

emailInput.addEventListener("input", () => {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(emailInput.value)) {
    emailError.textContent = "Invalid email";
    emailError.style.color = "red";
  } else {
    emailError.textContent = "";
  }
});

// CONTACT FORM (WITH VALIDATION BLOCK)
document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();

  let nameVal = document.getElementById("name").value;
  let emailVal = document.getElementById("email").value;
  let msgVal = document.getElementById("msg").value;

  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ❌ STOP IF INVALID
  if (!regex.test(emailVal)) {
    emailError.textContent = "Please enter a valid email";
    return;
  }

  // ✅ SAVE DATA
  let db = JSON.parse(localStorage.getItem("db")) || [];

  db.push({
    name: nameVal,
    email: emailVal,
    msg: msgVal,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("db", JSON.stringify(db));

  alert("Message saved!");
  this.reset();
});

// SHOW + DELETE
function showData(){
  let container = document.getElementById("user-messages");
  container.innerHTML = "";

  let db = JSON.parse(localStorage.getItem("db")) || [];

  db.forEach((d, i) => {
    container.innerHTML += `
      <div>
        <b>${d.name}</b> (${d.email})<br>
        ${d.msg}<br>
        <small>${d.time}</small><br>
        <button onclick="deleteMsg(${i})" style="background:red;">Delete</button>
      </div>
    `;
  });
}

function deleteMsg(i){
  let db = JSON.parse(localStorage.getItem("db")) || [];
  db.splice(i,1);
  localStorage.setItem("db", JSON.stringify(db));
  showData();
}

// PASSWORD TOGGLE
document.getElementById("togglePwd").onclick = () => {
  let pwd = document.getElementById("pswd");
  pwd.type = pwd.type === "password" ? "text" : "password";
};