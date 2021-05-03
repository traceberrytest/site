$(function() {
    const subscribeForm = document.querySelector('#subscribeForm');
    const subscribeButton = document.querySelector('button[name="subscribeButton"]');
    const subResponse = document.querySelector('p[name="subResponse"]');
    const formURL = 'https://ioh44z8np4.execute-api.us-east-2.amazonaws.com/Prod/submitForm';

    subscribeForm.onsubmit = e => {
      e.preventDefault();

      // Capture the form data
      let data = {};
      Array.from(subscribeForm).map(input => (data[input.id] = input.value));
      data['type'] = 'subscription';
      console.log('Sending: ', JSON.stringify(data));
      subscribeButton.disabled = true;
      subResponse.innerHTML = 'Sending...'

      // Create the AJAX request
      var xhr = new XMLHttpRequest();
      xhr.open(subscribeForm.method, formURL, true);
      xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      // Send the collected data as JSON
      xhr.send(JSON.stringify(data));

      xhr.onloadend = response => {
        if (response.target.status === 200) {
          subscribeForm.reset();
          subResponse.innerHTML = 'Subscription request submitted.';
        } else {
          subResponse.innerHTML = 'Please try again.';
          subscribeButton.disabled = false;
          console.error(JSON.parse(response));
        }
      };
    };
});
