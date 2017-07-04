
(function() {
  var httpRequest;

  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      console.log('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', '/weight_data');
    httpRequest.send();
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        chartData = JSON.parse(httpRequest.responseText);
        createChart(chartData);
      } else {
        console.log(`REsponse failed with error code: ${httpRequest.status}`);
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
