// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
  setupGreeting();
  fetchPrayerTimes();
});

function setupGreeting() {
  let userName = localStorage.getItem('userName');
  if (!userName) {
    userName = prompt('Please enter your name:') || 'User';
    localStorage.setItem('userName', userName);
  }

  const hour = new Date().getHours();
  let timeGreeting = 'Good Morning';
  if (hour >= 12 && hour < 17) timeGreeting = 'Good Afternoon';
  else if (hour >= 17 && hour < 21) timeGreeting = 'Good Evening';
  else if (hour >= 21 || hour < 5) timeGreeting = 'Good Night';

  document.getElementById('greeting').textContent = `${timeGreeting}, ${userName}!`;
}

function fetchPrayerTimes() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const timestamp = Math.floor(Date.now() / 1000);

      fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=2`)
        .then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            displayPrayerTimes(data.data.timings);
            displayNextPrayer(data.data.timings);
          } else {
            document.getElementById('prayer-list').innerHTML = '<p>Error loading prayer times.</p>';
          }
        })
        .catch(error => {
          document.getElementById('prayer-list').innerHTML = '<p>Error fetching prayer times.</p>';
        });
    }, () => {
      document.getElementById('prayer-list').innerHTML = '<p>Location access denied.</p>';
    });
  } else {
    document.getElementById('prayer-list').innerHTML = '<p>Geolocation not supported.</p>';
  }
}

function displayPrayerTimes(timings) {
  const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const list = document.getElementById('prayer-list');
  list.innerHTML = prayers.map(prayer => `
    <div class="prayer-item">
      <div class="name">${prayer}</div>
      <div class="time">${timings[prayer]}</div>
    </div>
  `).join('');
}

function displayNextPrayer(timings) {
  const now = new Date();
  const prayers = [
    { name: 'Fajr', time: timings.Fajr },
    { name: 'Dhuhr', time: timings.Dhuhr },
    { name: 'Asr', time: timings.Asr },
    { name: 'Maghrib', time: timings.Maghrib },
    { name: 'Isha', time: timings.Isha }
  ];

  let nextPrayer = null;
  let minDiff = Infinity;

  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerTime = new Date(now);
    prayerTime.setHours(hours, minutes, 0, 0);

    if (prayerTime > now) {
      const diff = prayerTime - now;
      if (diff < minDiff) {
        minDiff = diff;
        nextPrayer = prayer;
      }
    }
  }

  if (nextPrayer) {
    const hours = Math.floor(minDiff / (1000 * 60 * 60));
    const minutes = Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60));
    const timeString = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    document.getElementById('next-prayer').textContent = `Next: ${nextPrayer.name} in ${timeString}`;
  } else {
    document.getElementById('next-prayer').textContent = 'All prayers completed for today.';
  }
}