// Prayer times functionality
document.addEventListener('DOMContentLoaded', function() {
  getLocationAndFetchTimes();
});

function getLocationAndFetchTimes() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchPrayerTimes, showError);
  } else {
    document.getElementById('status').innerHTML = 'Geolocation is not supported by this browser.';
  }
}

function fetchPrayerTimes(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const timestamp = Math.floor(Date.now() / 1000);

  fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=2`)
    .then(response => response.json())
    .then(data => {
      if (data.code === 200) {
        displayPrayerTimes(data.data.timings, data.data.date.readable);
      } else {
        document.getElementById('status').innerHTML = 'Error: ' + data.status;
      }
    })
    .catch(error => {
      document.getElementById('status').innerHTML = 'Error fetching prayer times: ' + error.message;
    });
}

function showError(error) {
  let message = '';
  switch(error.code) {
    case error.PERMISSION_DENIED:
      message = 'Location access denied. Please allow location access or enter your location manually.';
      break;
    case error.POSITION_UNAVAILABLE:
      message = 'Location information is unavailable.';
      break;
    case error.TIMEOUT:
      message = 'Location request timed out.';
      break;
    case error.UNKNOWN_ERROR:
      message = 'An unknown error occurred.';
      break;
  }
  document.getElementById('status').innerHTML = message;
}

function displayPrayerTimes(timings, date) {
  document.getElementById('status').innerHTML = `Prayer Times for ${date}`;
  const display = document.getElementById('times-display');
  display.innerHTML = `
    <div class="prayer-grid">
      <div class="prayer-card">
        <h3>Fajr</h3>
        <p>${timings.Fajr}</p>
      </div>
      <div class="prayer-card">
        <h3>Sunrise</h3>
        <p>${timings.Sunrise}</p>
      </div>
      <div class="prayer-card">
        <h3>Dhuhr</h3>
        <p>${timings.Dhuhr}</p>
      </div>
      <div class="prayer-card">
        <h3>Asr</h3>
        <p>${timings.Asr}</p>
      </div>
      <div class="prayer-card">
        <h3>Maghrib</h3>
        <p>${timings.Maghrib}</p>
      </div>
      <div class="prayer-card">
        <h3>Isha</h3>
        <p>${timings.Isha}</p>
      </div>
    </div>
  `;
}</content>
<parameter name="filePath">/Users/hassanelghannam/Documents/projects/noorly/js/prayer.js