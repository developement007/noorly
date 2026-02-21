// Qibla direction calculation
const MECCA_LAT = 21.4225;
const MECCA_LON = 39.8262;

document.addEventListener('DOMContentLoaded', function() {
  getLocationAndCalculateQibla();
});

function getLocationAndCalculateQibla() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const bearing = calculateQiblaDirection(lat, lon);
      displayQibla(bearing);
    }, showError);
  } else {
    document.getElementById('direction-text').textContent = 'Geolocation not supported';
  }
}

function calculateQiblaDirection(lat, lon) {
  const dLon = (MECCA_LON - lon) * Math.PI / 180;
  const lat1 = lat * Math.PI / 180;
  const lat2 = MECCA_LAT * Math.PI / 180;

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  bearing = (bearing + 360) % 360; // Normalize to 0-360

  return bearing;
}

function displayQibla(bearing) {
  const needle = document.getElementById('needle');
  const directionText = document.getElementById('direction-text');
  const info = document.getElementById('qibla-info');

  needle.style.transform = `translateX(-50%) rotate(${bearing}deg)`;
  directionText.textContent = `${bearing.toFixed(1)}°`;

  // Determine cardinal direction
  let direction = '';
  if (bearing >= 337.5 || bearing < 22.5) direction = 'North';
  else if (bearing >= 22.5 && bearing < 67.5) direction = 'Northeast';
  else if (bearing >= 67.5 && bearing < 112.5) direction = 'East';
  else if (bearing >= 112.5 && bearing < 157.5) direction = 'Southeast';
  else if (bearing >= 157.5 && bearing < 202.5) direction = 'South';
  else if (bearing >= 202.5 && bearing < 247.5) direction = 'Southwest';
  else if (bearing >= 247.5 && bearing < 292.5) direction = 'West';
  else direction = 'Northwest';

  info.textContent = `Qibla direction: ${direction} (${bearing.toFixed(1)}° from North)`;
}

function showError(error) {
  document.getElementById('direction-text').textContent = 'Location access denied';
  document.getElementById('qibla-info').textContent = 'Please allow location access to calculate Qibla direction.';
}