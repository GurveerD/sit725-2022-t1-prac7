// To check if user is logged in and accordingly display button
let account;
checkLogin = () => {
  account = JSON.parse(sessionStorage.getItem('account'));
  if (account) {
    document.getElementById('reviewBtn').innerHTML = `
      <button type="button" class="btn rounded-circle btn-warning mt-4 px-3 py-1 fs-3" id="addBtn" data-bs-toggle="modal" data-bs-target="#modal">+</button>`;
    console.log(account.userName);
    var d = new Date();
    document.getElementById('postedBy').value = account.userName;
    document.getElementById('createdAt').value = d.toLocaleDateString();
    document.getElementById('logout').innerHTML = `
      <a class="mx-3 nav-link rounded-2 btn-outline-danger" role="button" onclick="logout()">Logout</a>`;
  }
  loadReviews();
};

// To get all the reviews from the API
loadReviews = () => {
  reviewCards = document.getElementById('reviewCards');
  fetch('/api/review')
    .then((res) => res.json())
    .then((reviews) => {
      if (reviews.length > 0) {
        for (let i = 0; i < reviews.length; i++) {
          reviewCards.innerHTML =
            reviewCards.innerHTML +
            `
         <div class="card rounded-3 border shadow mb-3" style="max-width: 800px">
          <div class="card-header">
            <span class="fs-3"><b>${reviews[i].title}</b></span>
          </div>
          <div class="row g-0">
            <div class="col-md-12">
              <img
                src="${reviews[i].imgUrl}"
                class="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div class="col-md-12">
              <div class="card-body">
                <h5 class="card-title fs-3">Review By: ${reviews[i].postedBy}</h5>
                <p class="card-title"><b>Product Name: </b>${reviews[i].productName}</p>
                <p class="card-title"><b>Category: </b>${reviews[i].category}</p>
                <p class="card-title"><b>Price: </b>${reviews[i].price}.00 $</p>
                <p class="card-title fs-4"><b>Review:</b></p>
                <p class="card-text">
                ${reviews[i].review}
                </p>
                <p class="card-text"><small class="text-muted">Posted on: ${reviews[i].createdAt}</small></p>
              </div>
            </div>
          </div>
        </div> 
         `;
        }
      } else {
        reviewCards.innerHTML = `
    <h1>
      Currently there are no available reviews
    </h1>`;
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};

// On form submit event handler
document.getElementById('form').onsubmit = (event) => {
  event.preventDefault();

  // Get form entries
  const formData = Object.fromEntries(new FormData(event.target));
  // Send request to server
  fetch('/api/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
      event.target.reset();
      location.reload();
    })
    .catch((error) => {
      alert(error.message);
    });
};

logout = () => {
  if (confirm('Are you sure you want to log out?')) {
    account = null;
    sessionStorage.clear();
    window.location = 'index.html';
  }
};
