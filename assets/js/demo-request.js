$(function() {
  const requestForm = document.querySelector('#requestForm');
  const requestButton = document.querySelector('button[name="requestButton"]');
  const submitResponse = document.querySelector('h5[name="response"]');
  const formURL = 'https://ioh44z8np4.execute-api.us-east-2.amazonaws.com/Prod/submitForm';

  requestForm.onsubmit = e => {
    e.preventDefault();

    // Capture the form data
    let data = {};
    Array.from(requestForm).map(input => (data[input.id] = input.value));
    data['type'] = 'request';
    console.log('Sending: ', JSON.stringify(data));
    requestButton.disabled = true;
    submitResponse.innerHTML = 'Sending...'

    // Create the AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open(requestForm.method, formURL, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = response => {
      if (response.target.status === 200) {
        requestForm.reset();
        submitResponse.innerHTML = 'Request submitted.';
      } else {
        submitResponse.innerHTML = 'Please try again.';
        requestButton.disabled = false;
        console.error(JSON.parse(response));
      }
    };
  };
});
