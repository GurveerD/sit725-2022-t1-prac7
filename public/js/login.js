// On form submit event handler
document.getElementById('form').onsubmit = (event) => {
    event.preventDefault();
  
    // Get form entries
    const formData = Object.fromEntries(new FormData(event.target));
    // Send request to server
    fetch('/api/account/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Welcome "+ data.account.userName);
        event.target.reset();
        sessionStorage.setItem('account', JSON.stringify(data.account));
        window.location = 'reviews.html'
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  console.log("Backend working");