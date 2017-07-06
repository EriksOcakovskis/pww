
(function() {
  var httpRequest;

  function makeRequest() {
    httpRequest = new XMLHttpRequest();
    timezoneOffset = new Date().getTimezoneOffset()/60;
    postData = JSON.stringify({'timezoneOffset':timezoneOffset});

    if (!httpRequest) {
      console.log('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = processResponse;
    httpRequest.open('POST', '/weight_data');
    httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    httpRequest.send(postData);
  }

  function processResponse() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        chartData = JSON.parse(httpRequest.responseText);
        createChart(chartData);
      } else {
        console.log(`Response failed with error code: ${httpRequest.status}`);
      }
    }
  }

  function createChart(data) {
    var ctx = document.getElementById('weightChart');
    var weightChart = new Chart(ctx, data);
  }

  if (document.getElementById('weightChart')) {
    makeRequest();
  }
})();
