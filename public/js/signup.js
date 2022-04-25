const userName = document.querySelector("#userName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
document.getElementById("form").onsubmit = (event) => {

// To prevent Reloading the page
  event.preventDefault();

  // To make a post request with the details
  fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: userName.value,
      email: email.value,
      password: password.value,
      createdAt: new Date().toGMTString(),
    }),
  })
  .then((res) => res.json())
  .then((data) => {
    alert(data.message);
    event.target.reset();
  })
  .catch((error) => {
    alert(error.message);
  });
};
