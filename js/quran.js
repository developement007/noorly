// Quran reader
document.addEventListener('DOMContentLoaded', function() {
  fetchSurahs();
  document.getElementById('back-btn').addEventListener('click', showSurahList);
});

function fetchSurahs() {
  fetch('https://api.alquran.cloud/v1/surah')
    .then(response => response.json())
    .then(data => {
      if (data.code === 200) {
        displaySurahs(data.data);
      } else {
        document.getElementById('surah-list').innerHTML = '<p>Error loading surahs.</p>';
      }
    })
    .catch(error => {
      document.getElementById('surah-list').innerHTML = '<p>Error fetching surahs.</p>';
    });
}

function displaySurahs(surahs) {
  const list = document.getElementById('surah-list');
  list.innerHTML = surahs.map(surah => `
    <div class="surah-card" onclick="loadSurah(${surah.number})">
      <div class="number">${surah.number}</div>
      <div class="name">${surah.name}</div>
      <div class="english">${surah.englishName}</div>
    </div>
  `).join('');
}

function loadSurah(number) {
  fetch(`https://api.alquran.cloud/v1/surah/${number}`)
    .then(response => response.json())
    .then(data => {
      if (data.code === 200) {
        displayVerses(data.data);
      } else {
        alert('Error loading surah.');
      }
    })
    .catch(error => {
      alert('Error fetching surah.');
    });
}

function displayVerses(surah) {
  document.getElementById('surah-list').style.display = 'none';
  document.getElementById('verses-container').style.display = 'block';
  document.getElementById('surah-title').textContent = `${surah.name} (${surah.englishName})`;

  const versesDiv = document.getElementById('verses');
  versesDiv.innerHTML = surah.ayahs.map(ayah => `
    <div class="verse">
      <span class="verse-number">${ayah.numberInSurah}.</span>
      ${ayah.text}
    </div>
  `).join('');
}

function showSurahList() {
  document.getElementById('verses-container').style.display = 'none';
  document.getElementById('surah-list').style.display = 'grid';
}