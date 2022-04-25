// On form submit event handler
document.getElementById('form').onsubmit = (event) => {
  event.preventDefault();

  // Get form entries
  const formData = Object.fromEntries(new FormData(event.target));
  // Send request to server
  fetch('/api/reviews', {
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
    })
    .catch((error) => {
      alert(error.message);
    });
};