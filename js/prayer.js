// Prayer times functionality
document.addEventListener('DOMContentLoaded', function() {
  getLocationAndFetchTimes();
  document.getElementById('notifications').addEventListener('change', handleNotificationToggle);
});

function handleNotificationToggle() {
  const enabled = document.getElementById('notifications').checked;
  if (enabled) {
    requestNotificationPermission();
  }
}

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
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Fajr</h3>
      <p class="text-3xl font-bold text-gray-900 dark:text-white mb-2">${timings.Fajr}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">Dawn Prayer</p>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div class="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-orange-600 dark:text-orange-400 mb-3">Sunrise</h3>
      <p class="text-3xl font-bold text-gray-900 dark:text-white mb-2">${timings.Sunrise}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">End of Fajr</p>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-green-600 dark:text-green-400 mb-3">Dhuhr</h3>
      <p class="text-3xl font-bold text-gray-900 dark:text-white mb-2">${timings.Dhuhr}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">Noon Prayer</p>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">Asr</h3>
      <p class="text-3xl font-bold text-gray-900 dark:text-white mb-2">${timings.Asr}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">Afternoon Prayer</p>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-red-600 dark:text-red-400 mb-3">Maghrib</h3>
      <p class="text-3xl font-bold text-gray-900 dark:text-white mb-2">${timings.Maghrib}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">Sunset Prayer</p>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Isha</h3>
      <p class="text-3xl font-bold text-gray-900 dark:text-white mb-2">${timings.Isha}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">Night Prayer</p>
    </div>
  `;
}

function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission();
  }
}

function scheduleNotifications(timings) {
  if (Notification.permission !== 'granted') return;

  const now = new Date();
  const prayers = [
    { name: 'Fajr', time: timings.Fajr },
    { name: 'Dhuhr', time: timings.Dhuhr },
    { name: 'Asr', time: timings.Asr },
    { name: 'Maghrib', time: timings.Maghrib },
    { name: 'Isha', time: timings.Isha }
  ];

  prayers.forEach(prayer => {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerTime = new Date(now);
    prayerTime.setHours(hours, minutes, 0, 0);

    if (prayerTime > now) {
      const delay = prayerTime - now;
      setTimeout(() => {
        new Notification(`Time for ${prayer.name} prayer`, {
          body: 'It\'s time to pray',
          icon: 'assets/images/icon.png' // Assuming an icon exists
        });
      }, delay);
    }
  });
}</content>
<parameter name="filePath">/Users/hassanelghannam/Documents/projects/noorly/js/prayer.js