console.log("Client JS file");

const weatherForm = document.querySelector("form");
const address = document.querySelector('#address');

const msg1 = document.querySelector('#error');
const msg2 = document.querySelector('#forecast');


msg1.textContent = '';
msg2.textContent = ''

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  msg1.textContent= 'Loading....'
  console.log("Submitted");
  if (!address.value) {
      msg1.textContent = 'Please provide address';
      msg2.textContent = ''
  } else {
    fetch(`http://localhost:3000/weather?address=${address.value}`).then((response) => {
        response.json().then((data) => {
          if (data.error) {
            msg1.textContent = data.error;
            msg2.textContent = ''
          } else {
            msg1.textContent = data.location
            msg2.textContent = data.forecast;
            msg1.textContent = '';
          }
        });
      });
  }
  
});