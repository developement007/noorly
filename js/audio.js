// Audio functionality
function playAudio(type) {
  const player = document.getElementById('audio-player');
  let src = '';

  // Placeholder audio sources (these would need to be actual URLs)
  switch(type) {
    case 'athan-makkah':
      src = 'https://www.islamicfinder.org/audio/athan/makkah.mp3'; // Example, may not work
      break;
    case 'athan-madinah':
      src = 'https://www.islamicfinder.org/audio/athan/madinah.mp3'; // Example
      break;
    case 'recitation-fatihah':
      src = 'https://server7.mp3quran.net/sds/001.mp3'; // Example Quran audio
      break;
    case 'recitation-ikhlas':
      src = 'https://server7.mp3quran.net/sds/112.mp3'; // Example
      break;
    case 'lecture-intro':
      src = 'https://example.com/lecture.mp3'; // Placeholder
      break;
    default:
      alert('Audio not available');
      return;
  }

  if (src) {
    player.src = src;
    player.style.display = 'block';
    player.play().catch(() => {
      alert('Unable to play audio. Please check your connection.');
    });
  } else {
    alert('Audio source not found');
  }
}