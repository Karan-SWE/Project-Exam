document.addEventListener('DOMContentLoaded', function() {
    var checkButton = document.getElementById('checkButton');
    checkButton.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var url = tabs[0].url;
        checkSafeBrowsing(url);
      });
    });
  });
  
  function checkSafeBrowsing(url) {
    var apiKey = 'AIzaSyBws_GLVevE74GRgKBzG66pWp0C2OzXnh8';
  var apiEndpoint = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';
  var requestBody = {
    client: {
      clientId: 'your-client-id',
      clientVersion: '1.0.0'
    },
    threatInfo: {
      threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
      platformTypes: ['ANY_PLATFORM'],
      threatEntryTypes: ['URL'],
      threatEntries: [{ url: url }]
    }
  };

  fetch(`${apiEndpoint}?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.matches && data.matches.length > 0) {
      alert('This website is not safe!');
    } else {
      alert('This website is safe.');
    }
  })
  .catch(error => console.error('Error checking Safe Browsing:', error));
}
  